import { LevelHandlerService } from 'src/app/handlers/level.service';
import { GameBlock } from 'src/app/models/gameBlocks/game-block';
import { Injectable, OnInit } from '@angular/core';
import { SwitchBlock } from '../models/gameBlocks/switch-block';
import { SwitchColor } from '../models/switchColor';
import { SwitcherBlock } from '../models/gameBlocks/switcher-block';
@Injectable({
  providedIn: 'root'
})
export class BlockSwitchServiceService implements OnInit {
  private switchBlocks: { [id: number]: Array<GameBlock>; } = {};
  constructor() { }
  ngOnInit(): void { }
  public loadLevel(levelHandler: LevelHandlerService): void {
    for (const color in SwitchColor) {
      if (!isNaN(Number(color))) {
        this.switchBlocks[color] = new Array<GameBlock>(0);
      }
    }
    levelHandler.getLevelGridTiles().forEach((element, yCoord) => {
      element.forEach((element2, xCoord) => {
        element2.forEach((element3, zCoord) => {
          if (element3 instanceof SwitchBlock) {
            this.switchBlocks[element3.switchColor].push(element3);
          }
        });
      });
    });
  }
  public getSwitchGroup(color: SwitchColor): Array<GameBlock> {
    return this.switchBlocks[color];
  }
  public SwitchColorGroup(color: SwitchColor, switcherBlock: SwitcherBlock): void {
    this.switchBlocks[color].forEach((block) => {
      (block as SwitchBlock).switchBlock(switcherBlock);
    });
  }
}
