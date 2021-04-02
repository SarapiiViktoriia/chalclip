import { Injectable } from '@angular/core';
import { LevelHandlerService } from 'src/app/handlers/level-handler.service';
import { EmptyBlock } from '../models/gameBlocks/empty-block';
import { GameBlock } from '../models/gameBlocks/game-block';
@Injectable({
  providedIn: 'root'
})
export class InventoryHandlerService {
  private inventory: Array<GameBlock> = new Array<GameBlock>(0);
  private inventrySize = 8;
  constructor(levelHandler: LevelHandlerService) {
    for (let inventoryItem = 0; inventoryItem < this.inventrySize; inventoryItem++) {
      this.inventory.push(new EmptyBlock(levelHandler));
    }
  }
  public getInventoryItems(elementsPerArray: number): Array<Array<GameBlock>> {
    const dimensionalInventory = new Array<Array<GameBlock>>(0);
    for (let index = 0; index < (this.inventrySize / elementsPerArray); index++) {
      dimensionalInventory[index] = new Array<GameBlock>(0);
      const elements = this.inventory.slice(index * elementsPerArray, index * elementsPerArray + elementsPerArray);
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
