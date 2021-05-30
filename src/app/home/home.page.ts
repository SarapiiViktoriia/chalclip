import { InventoryHandlerService } from '../handlers/inventory.service';
import { MoveDirection } from './../models/move-direction';
import { GameBlock } from '../models/gameBlocks/game-block';
import { LevelHandlerService } from '../handlers/level.service';
import { Component, OnDestroy } from '@angular/core';
import { HostListener } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { interval, Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
  private levelHandlerService: LevelHandlerService;
  public modalController: ModalController;
  public levelGrid: Array<Array<Array<GameBlock>>>;
  public inventory: InventoryHandlerService;
  public battery = 0;
  public energy = 0;
  public timeLeft = 5;
  private ngUnsubscribe = new Subject();
  constructor(levelHandlerService: LevelHandlerService, modalController: ModalController) {
    this.levelHandlerService = levelHandlerService;
    this.levelGrid = this.levelHandlerService.getLevelGridTiles();
    this.inventory = this.levelHandlerService.getInventory();
    this.modalController = modalController;
    this.startTimer();
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
        this.presentModal();
      }
    });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  async presentModal() {
  }
  @HostListener('document:keydown', ['$event'])
  keyListenerEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' || event.key === 'w') {
      this.levelHandlerService.moveBlock(this.levelHandlerService.player, MoveDirection.north);
    } else if (event.key === 'ArrowDown' || event.key === 's') {
      this.levelHandlerService.moveBlock(this.levelHandlerService.player, MoveDirection.south);
    } else if (event.key === 'ArrowLeft' || event.key === 'a') {
      this.levelHandlerService.moveBlock(this.levelHandlerService.player, MoveDirection.west);
    } else if (event.key === 'ArrowRight' || event.key === 'd') {
      this.levelHandlerService.moveBlock(this.levelHandlerService.player, MoveDirection.east);
    }
  }
}
