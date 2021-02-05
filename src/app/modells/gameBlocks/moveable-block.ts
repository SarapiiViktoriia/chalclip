import { MoveDirection } from './../move-direction';
import { GameBlock } from './game-block';
import { LevelHandlerService } from 'src/app/handlers/level-handler.service';
export class MoveableBlock extends GameBlock {
  constructor(levelHandler: LevelHandlerService) {
    super(levelHandler);
    this.$imageSource = 'assets/P_stone.bmp';
  }
  public canMoveToHere(blockToMove: GameBlock, direction: MoveDirection) {
    const currentPosition = this.levelHandler.getBlockPosition(this);
    const currentPositionStack = this.levelHandler.getZStack(currentPosition[0], currentPosition[1]);
    const newPosition = this.levelHandler.getNewPosition(currentPosition, direction);
    if (newPosition.includes(-1) || currentPosition === newPosition) {
      return false;
    }
    const newPositionStack = this.levelHandler.getZStack(newPosition[0], newPosition[1]);
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
}
