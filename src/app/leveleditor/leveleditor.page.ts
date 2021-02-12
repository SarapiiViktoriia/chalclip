import { MoveDirection } from './../modells/move-direction';
import { LevelHandlerService } from 'src/app/handlers/level-handler.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { GameBlock } from '../modells/gameBlocks/game-block';
@Component({
  selector: 'app-leveleditor',
  templateUrl: './leveleditor.page.html',
  styleUrls: ['./leveleditor.page.scss'],
})
export class LeveleditorPage {
  private levelHandlerService: LevelHandlerService;
  public items: Array<Array<Array<GameBlock>>>;
  constructor(levelHandlerService: LevelHandlerService) {
    this.levelHandlerService = levelHandlerService;
    this.items = this.levelHandlerService.getStack();
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
