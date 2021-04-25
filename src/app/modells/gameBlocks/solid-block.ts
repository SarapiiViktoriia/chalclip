import { LevelHandlerService } from './../../handlers/level-handler.service';
import { GameBlock } from './game-block';
import { StackLayer } from '../stackLayer';
export class SolidBlock extends GameBlock {
  constructor(levelHandler: LevelHandlerService) {
    super(levelHandler);
    this.$imageSource = 'assets/wall.bmp';
  }
  public name = 'Wall';
  public getInstance(levelHandler: LevelHandlerService): SolidBlock {
    return new SolidBlock(levelHandler);
  }
  public getStackZCoord(): StackLayer {
    return StackLayer.block;
  }
}
