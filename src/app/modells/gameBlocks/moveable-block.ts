import { MoveDirection } from './../move-direction';
import { GameBlock } from './game-block';
import { LevelHandlerService } from 'src/app/handlers/level-handler.service';
import { StackLayer } from '../stackLayer';
export class MoveableBlock extends GameBlock {
  constructor(levelHandler: LevelHandlerService) {
    super(levelHandler);
    this.$imageSource = 'assets/P_stone.bmp';
  }
  public name = 'Dirt';
  public canMoveToHere(blockToMove: GameBlock, direction: MoveDirection) {
    const currentPosition = this.levelHandler.getBlockPosition(this);
    const currentPositionStack = this.levelHandler.getZStack(currentPosition);
    const lastPosition = this.levelHandler.getLastPosition(currentPosition, direction);
    const lastPositionStack = this.levelHandler.getZStack(lastPosition);
    if (!lastPositionStack.includes(this.levelHandler.player)) {
      return false;
    }
    const newPosition = this.levelHandler.getNewPosition(currentPosition, direction);
    if (newPosition.includes(-1) || currentPosition === newPosition) {
      return false;
    }
    const newPositionStack = this.levelHandler.getZStack(newPosition);
    if (!this.levelHandler.executeCanMoveFromHere(this, direction, currentPositionStack)) {
      return false;
    }
    if (!this.levelHandler.executeCanMoveToHere(this, direction, newPositionStack)) {
      return false;
    }
    return true;
  }
  public preMoveEvent(blockToMove: GameBlock, direction: MoveDirection, blockStack: Array<GameBlock>) {
    if (blockToMove !== this) {
      this.levelHandler.moveBlock(this, direction);
    }
  }
  public getInstance(levelHandler: LevelHandlerService): MoveableBlock {
    return new MoveableBlock(levelHandler);
  }
  public getStackZCoord(): StackLayer {
    return StackLayer.block;
  }
}
