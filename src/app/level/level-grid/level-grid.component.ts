import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameBlock } from 'src/app/models/gameBlocks/game-block';
import { LevelHandlerService } from 'src/app/handlers/level.service';
@Component({
  selector: 'app-level-grid',
  templateUrl: './level-grid.component.html',
  styleUrls: ['./level-grid.component.scss'],
})
export class LevelGridComponent implements OnInit {
  @Output() tileClick = new EventEmitter<GameBlock>();
  public levelGrid: Array<Array<Array<GameBlock>>>;
  constructor(private levelService: LevelHandlerService) { }
  ngOnInit() {
    this.levelGrid = this.levelService.getLevelGridTiles();
  }
  tileClicked(tile: GameBlock) {
    this.tileClick.emit(tile);
  }
}
