import { OptionsPage } from './options/options.page';
import { ModalController } from '@ionic/angular';
import { WoodBackground } from './../models/gameBlocks/Background/wood-background';
import { SolidBlock } from './../models/gameBlocks/solid-block';
import { Player } from './../models/gameBlocks/player';
import { MoveableBlock } from './../models/gameBlocks/moveable-block';
import { MoveDirection } from './../models/move-direction';
import { LevelHandlerService } from 'src/app/handlers/level-handler.service';
import { Component, HostListener } from '@angular/core';
import { GameBlock } from '../models/gameBlocks/game-block';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-leveleditor',
  templateUrl: './leveleditor.page.html',
  styleUrls: ['./leveleditor.page.scss'],
})
export class LeveleditorPage {
  public items: Array<Array<Array<GameBlock>>>;
  public selectedItem: GameBlock;
  public chipsChallenge1Items: Array<GameBlock> = new Array(0);
  constructor(
    private levelHandler: LevelHandlerService,
    private modalController: ModalController,
    private http: HttpClient
  ) {
    this.modalController = modalController;
    this.items = this.levelHandler.getStack();
    this.chipsChallenge1Items.push(
      new Player(levelHandler),
      new MoveableBlock(levelHandler),
      new SolidBlock(levelHandler),
      new WoodBackground(levelHandler)
    );
  }
  @HostListener('document:keydown', ['$event'])
  keyListenerEvent(event: KeyboardEvent) {
    if (this.levelHandler.player != null) {
      if (event.key === 'ArrowUp' || event.key === 'w') {
        this.levelHandler.moveBlock(this.levelHandler.player, MoveDirection.moveNorth);
      } else if (event.key === 'ArrowDown' || event.key === 's') {
        this.levelHandler.moveBlock(this.levelHandler.player, MoveDirection.moveSouth);
      } else if (event.key === 'ArrowLeft' || event.key === 'a') {
        this.levelHandler.moveBlock(this.levelHandler.player, MoveDirection.moveWest);
      } else if (event.key === 'ArrowRight' || event.key === 'd') {
        this.levelHandler.moveBlock(this.levelHandler.player, MoveDirection.moveEast);
      }
    }
  }
  public itemClicked(item: GameBlock) {
    this.selectedItem = item;
  }
  public levelClicked(blockItem: GameBlock) {
    if (!this.selectedItem) {
      return;
    }
    const position = this.levelHandler.getBlockPosition(blockItem);
    this.levelHandler.createNewBlockAtPosition(this.selectedItem, position);
  }
  public optionsClicked() {
    this.presentModal();
  }
  private async presentModal() {
    const modal = await this.modalController.create({
      component: OptionsPage,
      componentProps: {
        levelHandler: this.levelHandler,
        http: this.http
      }
    });
    return await modal.present();
  }
}
