import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { interval } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LevelHandlerService } from 'src/app/handlers/level.service';
import { InventoryHandlerService } from 'src/app/handlers/inventory.service';
@Component({
  selector: 'app-level-status-sidebar',
  templateUrl: './level-status-sidebar.component.html',
  styleUrls: ['./level-status-sidebar.component.scss'],
})
export class LevelStatusSidebarComponent implements OnInit, OnDestroy {
  public battery = 0;
  public energy = 0;
  public timeLeft = 5;
  public inventory: InventoryHandlerService;
  private ngUnsubscribe = new Subject();
  @Output() levelTimeout = new EventEmitter();
  constructor(private levelHandlerService: LevelHandlerService) { }
  ngOnInit() {
    this.inventory = this.levelHandlerService.getInventory();
    this.startTimer();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  private startTimer() {
    const counter$ = interval(1000);
    const takeFourNumbers = counter$.pipe(
      take(this.timeLeft),
      takeUntil(this.ngUnsubscribe)
    );
    takeFourNumbers.subscribe(x => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        this.levelTimeout.emit();
      }
    });
  }
}
