import { MoveDirection } from '../../move-direction';
import { LevelHandlerService } from '../../../handlers/level.service';
import { GameBlock } from '../game-block';
import { StackLayer } from '../../stackLayer';
export class WoodBackground extends GameBlock {
  constructor(levelHandler: LevelHandlerService) {
    super(levelHandler);
    this.$imageSource = 'assets/background/wood.bmp';
  }
  public name = 'Wood Background';
  public canMoveToHere(blockToMove: GameBlock, direction: MoveDirection) {
    return true;
  }
  public getStackZCoord(): StackLayer {
    return StackLayer.texture;
  }
  public getInstance(levelHandler: LevelHandlerService) {
    return new WoodBackground(levelHandler);
  }
}
