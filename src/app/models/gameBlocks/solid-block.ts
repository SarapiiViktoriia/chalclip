import { LevelHandlerService } from '../../handlers/level.service';
import { GameBlock } from './game-block';
import { StackLayer } from '../stackLayer';
export class SolidBlock extends GameBlock {
  constructor(levelHandler: LevelHandlerService) {
    super(levelHandler);
    this.$imageSource = 'assets/wall.bmp';
  }
  public static '@type' = 'Wall';
  public '@type' = 'Wall';
  public name = 'Wall';
  public static getInstance(levelHandler: LevelHandlerService): SolidBlock {
    return new SolidBlock(levelHandler);
  }
  public getStackZCoord(): StackLayer {
    return StackLayer.block;
  }
}
