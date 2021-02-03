import { Countdown } from './../helper/timer';
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
  levelHandlerService: LevelHandlerService;
  modalController: ModalController;
  items: Array<Array<Array<GameBlock>>>;
  inventory: InventoryHandler;
  time: Countdown = new Countdown();
  battery = 0;
  energy = 0;
  constructor(levelHandlerService: LevelHandlerService, modalController: ModalController) {
    this.levelHandlerService = levelHandlerService;
    this.items = this.levelHandlerService.getStack();
    this.inventory = this.levelHandlerService.getInventory();
    this.modalController = modalController;
    this.time.on('expired', () => this.presentModal());
    this.time.start(10);
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
