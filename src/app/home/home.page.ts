import { InventoryHandler } from '../handlers/inventory-handler';
import { MoveDirection } from './../modells/move-direction';
import { Player } from '../modells/gameBlocks/player';
import { GameBlock } from '../modells/gameBlocks/game-block';
import { LevelHandlerService } from '../handlers/level-handler.service';
import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private levelHandlerService: LevelHandlerService;
  public modalController: ModalController;
  public items: Array<Array<Array<GameBlock>>>;
  public inventory: InventoryHandler;
  public battery = 0;
  public energy = 0;
  public timeLeft: number = 5;
  private interval;
  constructor(levelHandlerService: LevelHandlerService, modalController: ModalController) {
    this.levelHandlerService = levelHandlerService;
    this.items = this.levelHandlerService.getStack();
    this.inventory = this.levelHandlerService.getInventory();
    this.modalController = modalController;
    this.startTimer();
  }
  private startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft >= 2) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
        clearInterval(this.interval);
        this.presentModal();
      }
    }, 1000);
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
