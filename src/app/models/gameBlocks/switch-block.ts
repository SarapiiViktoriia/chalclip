import { SwitchColor } from '../switchColor';
import { LevelHandlerService } from '../../handlers/level.service';
import { GameBlock } from './game-block';
import { StackLayer } from '../stackLayer';
export abstract class SwitchBlock extends GameBlock {
  constructor(levelHandler: LevelHandlerService) {
    super(levelHandler);
  }
  public static '@type' = 'Switch';
  public '@type' = 'Switch';
  public name = 'Switch';
  public switchColor: SwitchColor;
  protected currentState = false;
  public static getInstance(levelHandler: LevelHandlerService): SwitchBlock {
    return null;
  }
  public getStackZCoord(): StackLayer {
    return null;
  }
  public switchBlock(switchBlock: SwitchBlock) {
    this.currentState = !this.currentState;
  }
}