import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameBlock } from 'src/app/models/gameBlocks/game-block';
@Component({
  selector: 'app-level-grid',
  templateUrl: './level-grid.component.html',
  styleUrls: ['./level-grid.component.scss'],
})
export class LevelGridComponent implements OnInit {
  @Input() levelGrid: Array<Array<Array<GameBlock>>>;
  @Output() tileClick = new EventEmitter<GameBlock>();
  constructor() { }
  ngOnInit() {}
  tileClicked(tile: GameBlock) {
    this.tileClick.emit(tile);
  }
}
