import { WoodBackground } from '../models/gameBlocks/background/wood-background';
import { SolidBlock } from './../models/gameBlocks/solid-block';
import { Player } from './../models/gameBlocks/player';
import { MoveableBlock } from './../models/gameBlocks/moveable-block';
import { MoveDirection } from './../models/move-direction';
import { LevelHandlerService } from 'src/app/handlers/level.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { GameBlock } from '../models/gameBlocks/game-block';
@Component({
  selector: 'app-leveleditor',
  templateUrl: './leveleditor.page.html',
  styleUrls: ['./leveleditor.page.scss']
})
export class LeveleditorPage {
  public levelGrid: Array<Array<Array<GameBlock>>>;
  public selectedItem: GameBlock;
  public chipsChallenge1Items: Array<GameBlock> = new Array(0);
  constructor(private levelHandler: LevelHandlerService) {
    this.levelGrid = this.levelHandler.getLevelGridTiles();
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
        this.levelHandler.moveBlock(this.levelHandler.player, MoveDirection.north);
      } else if (event.key === 'ArrowDown' || event.key === 's') {
        this.levelHandler.moveBlock(this.levelHandler.player, MoveDirection.south);
      } else if (event.key === 'ArrowLeft' || event.key === 'a') {
        this.levelHandler.moveBlock(this.levelHandler.player, MoveDirection.west);
      } else if (event.key === 'ArrowRight' || event.key === 'd') {
        this.levelHandler.moveBlock(this.levelHandler.player, MoveDirection.east);
      }
    }
  }
  public itemClicked(item: GameBlock) {
    console.log('selected item:', item);
    this.selectedItem = item;
  }
  public tileClicked(blockItem: GameBlock) {
    console.log('replace old block', blockItem, 'with', this.selectedItem);
    if (!this.selectedItem) {
      return;
    }
    const position = this.levelHandler.getBlockPosition(blockItem);
    this.levelHandler.createNewBlockAtPosition(this.selectedItem, position);
  }
}
