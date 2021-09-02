import { GreenButton } from './../models/gameBlocks/green-button';
import { LevelHandlerService } from 'src/app/handlers/level.service';
import { EmptyBlock } from './../models/gameBlocks/empty-block';
import { MoveableBlock } from './../models/gameBlocks/moveable-block';
import { SolidBlock } from './../models/gameBlocks/solid-block';
import { Player } from './../models/gameBlocks/player';
import { GameBlock } from '../models/gameBlocks/game-block';
import { WoodBackground } from '../models/gameBlocks/background/wood-background';
export class GameBlockFactory {
  static createGameBlock<T extends GameBlock>(block: GameBlock, levelHandler: LevelHandlerService): T {
    if (block == null) {
      return;
    }
    switch (block['@type']) {
      case Player['@type']:
        return Player.getInstance(levelHandler) as any; 
      case SolidBlock['@type']:
        return SolidBlock.getInstance(levelHandler) as any; 
      case MoveableBlock['@type']:
        return MoveableBlock.getInstance(levelHandler) as any; 
      case EmptyBlock['@type']:
        return EmptyBlock.getInstance(levelHandler) as any; 
      case WoodBackground['@type']:
        return WoodBackground.getInstance(levelHandler) as any; 
      case GreenButton['@type']:
        return GreenButton.getInstance(levelHandler) as any; 
      default:
        throw new TypeError(block['@type'] + ' is currently not supported');
    }
  }
}
