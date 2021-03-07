import { LevelHandlerService } from './../../handlers/level-handler.service';
import { GameBlock } from './game-block';
export class SolidBlock extends GameBlock {
  constructor(levelHandler: LevelHandlerService) {
    super(levelHandler);
    this.$imageSource = "assets/wall.bmp";
  }
}
