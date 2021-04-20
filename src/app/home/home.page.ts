import { InventoryHandlerService } from '../handlers/inventory-handler.service';
import { MoveDirection } from './../models/move-direction';
import { GameBlock } from '../models/gameBlocks/game-block';
import { LevelHandlerService } from '../handlers/level-handler.service';
import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private levelHandlerService: LevelHandlerService;
  public modalController: ModalController;
  public items: Array<Array<Array<GameBlock>>>;
  public inventory: InventoryHandlerService;
  public battery = 0;
  public energy = 0;
  public timeLeft = 5;
  constructor(levelHandlerService: LevelHandlerService, modalController: ModalController) {
    this.levelHandlerService = levelHandlerService;
    this.items = this.levelHandlerService.getStack();
    this.inventory = this.levelHandlerService.getInventory();
    this.modalController = modalController;
    this.startTimer();
  }
  private startTimer() {
    const counter = interval(1000);
    const takeFourNumbers = counter.pipe(take(this.timeLeft));
    takeFourNumbers.subscribe(x => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        this.presentModal();
      }
    });
  }
  async presentModal() {
  }
  @HostListener('document:keydown', ['$event'])
  keyListenerEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' || event.key === 'w') {
      this.levelHandlerService.moveBlock(this.levelHandlerService.player, MoveDirection.moveNorth);
    } else if (event.key === 'ArrowDown' || event.key === 's') {
      this.levelHandlerService.moveBlock(this.levelHandlerService.player, MoveDirection.moveSouth);
    } else if (event.key === 'ArrowLeft' || event.key === 'a') {
      this.levelHandlerService.moveBlock(this.levelHandlerService.player, MoveDirection.moveWest);
    } else if (event.key === 'ArrowRight' || event.key === 'd') {
      this.levelHandlerService.moveBlock(this.levelHandlerService.player, MoveDirection.moveEast);
    }
  }
}
