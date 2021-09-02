import { StackLayer } from './../stackLayer';
import { MoveDirection } from './../move-direction';
import { GameBlock } from 'src/app/models/gameBlocks/game-block';
import { LevelHandlerService } from 'src/app/handlers/level.service';
import { SwitcherBlock } from './switcher-block';
export class GreenButton extends SwitcherBlock {
  constructor(levelHandler: LevelHandlerService) {
    super(levelHandler);
    this.$imageSource = 'assets/greenButton.svg';
  }
  public static '@type' = 'GreenButton';
  public '@type' = 'GreenButton';
  public name = 'Green Button';
  public static getInstance(levelHandler: LevelHandlerService): GreenButton {
    return new GreenButton(levelHandler);
  }
  public getStackZCoord(): StackLayer {
    return StackLayer.floor;
  }
  public canMoveToHere(): boolean {
    return true;
  }
  public postMoveEvent(blockToMove: GameBlock, direction: MoveDirection, blockStack: Array<GameBlock>) {
    const position = this.levelHandler.getBlockPosition(this);
    const positionOtherBlock = this.levelHandler.getBlockPosition(blockToMove);
    if (position[0] === positionOtherBlock[0] && position[1] === positionOtherBlock[1]) {
      this.levelHandler.SwitchColorGroup(this.switchColor, this);
    }
  }
}
