import { MoveDirection } from './../models/move-direction';
import { LevelHandlerService } from 'src/app/handlers/level.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { GameBlock } from '../models/gameBlocks/game-block';
@Component({
  selector: 'app-leveleditor',
  templateUrl: './leveleditor.page.html',
  styleUrls: ['./leveleditor.page.scss']
})
export class LeveleditorPage implements OnInit {
  public levelGrid: Array<Array<Array<GameBlock>>>;
  public selectedItem: GameBlock;
  constructor(
    private levelHandler: LevelHandlerService
  ) { }
  ngOnInit(): void {
    this.levelGrid = this.levelHandler.getLevelGridTiles();
    console.log('Loaded grid items', this.levelGrid);
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
    this.selectedItem = item;
  }
  public tileClicked(blockItem: GameBlock) {
    if (!this.selectedItem) {
      return;
    }
    const position = this.levelHandler.getBlockPosition(blockItem);
    this.levelHandler.createNewBlockAtPosition(this.selectedItem, position);
    console.log('replaced old block', blockItem, 'with', this.selectedItem);
  }
}
