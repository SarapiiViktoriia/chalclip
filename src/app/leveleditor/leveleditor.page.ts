import { WoodBackground } from './../models/gameBlocks/Background/wood-background';
import { SolidBlock } from './../models/gameBlocks/solid-block';
import { Player } from './../models/gameBlocks/player';
import { MoveableBlock } from './../models/gameBlocks/moveable-block';
import { MoveDirection } from './../models/move-direction';
import { LevelHandlerService } from 'src/app/handlers/level-handler.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { GameBlock } from '../models/gameBlocks/game-block';
@Component({
  selector: 'app-leveleditor',
  templateUrl: './leveleditor.page.html',
  styleUrls: ['./leveleditor.page.scss'],
})
export class LeveleditorPage {
  private levelHandler: LevelHandlerService;
  public items: Array<Array<Array<GameBlock>>>;
  public selectedItem: GameBlock;
  public chipsChallenge1Items: Array<GameBlock> = new Array(0);
  constructor(levelHandlerService: LevelHandlerService) {
    this.levelHandler = levelHandlerService;
    this.items = this.levelHandler.getStack();
    this.chipsChallenge1Items.push(
      new Player(levelHandlerService),
      new MoveableBlock(levelHandlerService),
      new SolidBlock(levelHandlerService),
      new WoodBackground(levelHandlerService)
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
}
