import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameBlock } from 'src/app/models/gameBlocks/game-block';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-level-tile',
  templateUrl: './level-tile.component.html',
  styleUrls: ['./level-tile.component.scss'],
})
export class LevelTileComponent implements OnInit {
  @Input() public tile: GameBlock;
  @Output() click = new EventEmitter<GameBlock>();
  public showTileTitle: boolean;
  public useIonThumbnail: boolean;
  constructor() { }
  ngOnInit() {
    if (environment.showTileTitle) {
      this.showTileTitle = true;
    }
    if (environment.useIonThumbnail) {
      this.useIonThumbnail = true;
    }
  }
  tileClicked(tile: GameBlock) {
    this.click.emit(tile);
  }
}
