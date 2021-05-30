import { Injectable } from '@angular/core';
import { EmptyBlock } from '../models/gameBlocks/empty-block';
import { GameBlock } from '../models/gameBlocks/game-block';
@Injectable({
  providedIn: 'root'
})
export class InventoryHandlerService {
  private inventory: Array<GameBlock> = new Array<GameBlock>(0);
  private inventorySize = 8;
  constructor() {
    for (let inventoryItem = 0; inventoryItem < this.inventorySize; inventoryItem++) {
      this.inventory.push(new EmptyBlock(null));
    }
  }
  public getInventoryItems(elementsPerArray: number): Array<Array<GameBlock>> {
    const dimensionalInventory = new Array<Array<GameBlock>>(0);
    for (let index = 0; index < (this.inventorySize / elementsPerArray); index++) {
      dimensionalInventory[index] = new Array<GameBlock>(0);
      const elements = this.inventory.slice(index * elementsPerArray, index * elementsPerArray + elementsPerArray);
      dimensionalInventory[index] = elements;
    }
    return dimensionalInventory;
  }
  public add(item: GameBlock): boolean {
    for (let index = 0; index < this.inventory.length; index++) {
      this.inventory[index] = item;
      return true;
    }
    return false;
  }
}
