import { LevelHandlerService } from './../../handlers/level-handler.service';
import { GameBlock } from './game-block';
import { MoveDirection } from '../move-direction';
import { StackLayer } from '../stackLayer';
export class Player extends GameBlock {
  constructor(levelHandler: LevelHandlerService) {
    super(levelHandler);
    this.$imageSource = 'assets/person_down.bmp';
  }
  public static '@type' = 'Player';
  public '@type' = 'Player';
  public name = 'Clippy';
  public static getInstance(levelHandler: LevelHandlerService): Player {
    return new Player(levelHandler);
  }
  public preCheckEvent(blockToMove: GameBlock, direction: MoveDirection, blockStack: Array<GameBlock>) {
    switch (direction) {
      case MoveDirection.moveNorth:
        this.$imageSource = 'assets/person_up.bmp';
        break;
      case MoveDirection.moveSouth:
        this.$imageSource = 'assets/person_down.bmp';
        break;
      case MoveDirection.moveEast:
        this.$imageSource = 'assets/person_right.bmp';
        break;
      case MoveDirection.moveWest:
        this.$imageSource = 'assets/person_left.bmp';
        break;
    }
  }
  public getStackZCoord(): StackLayer {
    return StackLayer.player;
  }
}
