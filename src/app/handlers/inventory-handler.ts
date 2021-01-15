import { LevelHandlerService } from 'src/app/handlers/level-handler.service';
import { EmptyBlock } from '../modells/gameBlocks/empty-block';
import { GameBlock } from '../modells/gameBlocks/game-block';
export class InventoryHandler {
  private inventory: Array<GameBlock> = new Array<GameBlock>(0);
  private inventrySize: number = 8;
  constructor(levelHandler: LevelHandlerService) {
    for (let inventoryItem = 0; inventoryItem < this.inventrySize; inventoryItem++) {
      this.inventory.push(new EmptyBlock(levelHandler));
    }
  }
  public getInventoryItems(elementsPerArray: number): Array<Array<GameBlock>> {
    let dimensionalInventory = new Array<Array<GameBlock>>(0);
    for (let index = 0; index < (this.inventrySize / elementsPerArray); index++) {
      dimensionalInventory[index] = new Array<GameBlock>(0);
      let elements = this.inventory.slice(index * elementsPerArray, index * elementsPerArray + elementsPerArray);
      dimensionalInventory[index] = elements;
    }
    return dimensionalInventory;
  }
  public add(block: GameBlock): boolean {
    for (let index = 0; index < this.inventory.length; index++) {
      const element = this.inventory[index];
      this.inventory[index] = block;
      return true;
    }
    return false;
  }
}
