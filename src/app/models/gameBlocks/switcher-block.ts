import { GameBlock } from 'src/app/models/gameBlocks/game-block';
import { MoveDirection } from './../move-direction';
import { LevelHandlerService } from '../../handlers/level.service';
import { SwitchBlock } from './switch-block';
export abstract class SwitcherBlock extends SwitchBlock {
  constructor(levelHandler: LevelHandlerService) {
    super(levelHandler);
  }
  public static '@type' = 'Switcher';
  public '@type' = 'Switcher';
  public name = 'Switcher';
  public postMoveEvent(blockToMove: GameBlock, direction: MoveDirection, blockStack: Array<GameBlock>) {
    this.levelHandler.SwitchColorGroup(this.switchColor, this);
  }
}
