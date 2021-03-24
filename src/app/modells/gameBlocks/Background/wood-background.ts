import { MoveDirection } from './../../move-direction';
import { LevelHandlerService } from '../../../handlers/level-handler.service';
import { GameBlock } from '../game-block';
export class WoodBackground extends GameBlock {
  constructor(levelHandler: LevelHandlerService) {
    super(levelHandler);
    this.$imageSource = "assets/background/wood.bmp";
  }
  public canMoveToHere(blockToMove: GameBlock, direction: MoveDirection) {
    return true;
  }
}
