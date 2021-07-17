import { LevelHandlerService } from '../../handlers/level.service';
import { GameBlock } from './game-block';
import { MoveDirection } from '../move-direction';
import { StackLayer } from '../stackLayer';
export class Player extends GameBlock {
  constructor(levelHandler: LevelHandlerService) {
    super(levelHandler);
    this.$imageSource = 'assets/person_down.bmp';
  }
  public name = 'Clippy';
  public preCheckEvent(blockToMove: GameBlock, direction: MoveDirection, blockStack: Array<GameBlock>) {
    switch (direction) {
      case MoveDirection.north:
        this.$imageSource = 'assets/person_up.bmp';
        break;
      case MoveDirection.south:
        this.$imageSource = 'assets/person_down.bmp';
        break;
      case MoveDirection.east:
        this.$imageSource = 'assets/person_right.bmp';
        break;
      case MoveDirection.west:
        this.$imageSource = 'assets/person_left.bmp';
        break;
    }
  }
  public getStackZCoord(): StackLayer {
    return StackLayer.player;
  }
  public getInstance(levelHandler: LevelHandlerService): Player {
    return new Player(levelHandler);
  }
}
