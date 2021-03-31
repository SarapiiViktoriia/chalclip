import { StackLayer } from './../stackLayer';
import { MoveDirection } from './../move-direction';
import { LevelHandlerService } from './../../handlers/level-handler.service';
import { GameBlock } from './game-block';
export class EmptyBlock extends GameBlock {
  constructor(levelHandler: LevelHandlerService) {
    super(levelHandler);
    this.$imageSource = 'assets/empty.bmp';
  }
  public name = 'Placeholder';
  public canMoveToHere(blockToMove: GameBlock, direction: MoveDirection) {
    return true;
  }
  public getStackZCoord(): StackLayer {
    return null;
  }
}
