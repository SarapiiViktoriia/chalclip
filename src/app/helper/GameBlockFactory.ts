import { EmptyBlock } from './../models/gameBlocks/empty-block';
import { MoveableBlock } from './../models/gameBlocks/moveable-block';
import { LevelHandlerService } from 'src/app/handlers/level-handler.service';
import { SolidBlock } from './../models/gameBlocks/solid-block';
import { Player } from './../models/gameBlocks/player';
import { GameBlock } from '../models/gameBlocks/game-block';
import { WoodBackground } from '../models/gameBlocks/Background/wood-background';
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
      case undefined:
        return undefined;
      default:
        throw new Error(block['@type'] + ' is currently not supported');
    }
  }
}
