import { Player } from '../models/gameBlocks/player';
import { InventoryHandlerService } from './inventory.service';
import { EmptyBlock } from '../models/gameBlocks/empty-block';
import { MoveDirection } from '../models/move-direction';
import { GameBlock } from '../models/gameBlocks/game-block';
import { WoodBackground } from '../models/gameBlocks/background/wood-background';
import { MoveableBlock } from '../models/gameBlocks/moveable-block';
import { SolidBlock } from '../models/gameBlocks/solid-block';
import { Injectable } from '@angular/core';
import { StackLayer } from '../models/stackLayer';
@Injectable({
  providedIn: 'root'
})
export class LevelHandlerService {
  private tiles: GameBlock[][][] = new Array<Array<Array<GameBlock>>>(0);
  public player: Player;
  protected inventory: InventoryHandlerService = new InventoryHandlerService();
  constructor() {
    this.loadLevel();
  }
  private loadLevel() {
    for (let y = 0; y < 9; y++) {
      this.tiles[y] = new Array<Array<GameBlock>>(0);
      for (let x = 0; x < 9; x++) {
        this.tiles[y][x] = new Array<GameBlock>(this.getPaneCount());
        this.tiles[y][x][StackLayer.texture] = new WoodBackground(this);
        this.tiles[y][x][StackLayer.block] = new EmptyBlock(this);
        this.tiles[y][x][StackLayer.player] = new EmptyBlock(this);
      }
    }
    this.player = new Player(this);
    this.tiles[4][4][StackLayer.player] = this.player;
    this.tiles[4][5][StackLayer.block] = new SolidBlock(this);
    this.tiles[4][3][StackLayer.block] = new MoveableBlock(this);
    this.tiles[4][2][StackLayer.block] = new MoveableBlock(this);
    this.tiles[4][1][StackLayer.block] = new SolidBlock(this);
  }
  public getLevelGridTiles(): GameBlock[][][] {
    return this.tiles;
  }
  public getZStack(position: Array<number>): Array<GameBlock> {
    return this.tiles[position[0]][position[1]];
  }
  public getTilesGroupedPerPane(): Array<Array<Array<GameBlock>>> {
    const paneArray: GameBlock[][][] = new Array<Array<Array<GameBlock>>>(this.getPaneCount());
    for (let yCoord = 0; yCoord < this.tiles.length; yCoord++) {
      const row = this.tiles[yCoord];
      for (let xCoord = 0; xCoord < row.length; xCoord++) {
        const column = row[xCoord];
        for (let zCoord = 0; zCoord < row.length; zCoord++) {
          const tile = column[zCoord];
          paneArray[zCoord][yCoord][xCoord] = tile;
        }
      }
    }
    return paneArray;
  }
  private getPaneCount(): number {
    return Object.keys(StackLayer).length / 2;
  }
  public getBlockPosition(block: GameBlock): number[] {
    const location = new Array(3);
    this.tiles.forEach((element, yCoord) => {
      element.forEach((element2, xCoord) => { 
        const zCoord = element2.indexOf(block);
        if (zCoord !== -1) {
          location[0] = yCoord;
          location[1] = xCoord;
          location[2] = zCoord; 
        }
      });
    });
    return location;
  }
  public moveBlock(block: GameBlock, direction: MoveDirection): boolean {
    const currentPosition = this.getBlockPosition(block);
    const currentPositionStack = this.getZStack(currentPosition);
    const newPosition = this.getNewPosition(currentPosition, direction);
    if (newPosition.includes(-1) || currentPosition === newPosition) {
      return false;
    }
    const newPositionStack = this.getZStack(newPosition);
    if (!newPositionStack) {
      return false;
    }
    this.executePreCheckEvent(block, direction, currentPositionStack);
    this.executePreCheckEvent(block, direction, newPositionStack);
    if (!this.executeCanMoveFromHere(block, direction, currentPositionStack)) {
      return false;
    }
    if (!this.executeCanMoveToHere(block, direction, newPositionStack)) {
      return false;
    }
    this.executePreMoveEvent(block, direction, currentPositionStack);
    this.executePreMoveEvent(block, direction, newPositionStack);
    this.executeMoveBlock(block, direction);
    this.executePostMoveEvent(block, direction, currentPositionStack);
    this.executePostMoveEvent(block, direction, newPositionStack);
    return true;
  }
  private executeMoveBlock(block: GameBlock, direction: MoveDirection) {
    const currentPosition = this.getBlockPosition(block);
    const newPosition = this.getNewPosition(currentPosition, direction);
    this.tiles[newPosition[0]][newPosition[1]][newPosition[2]] = block;
    const newEmptyBlock = new EmptyBlock(this);
    this.tiles[currentPosition[0]][currentPosition[1]][currentPosition[2]] = newEmptyBlock;
  }
  public executeCanMoveFromHere(blockToMove: GameBlock, direction: MoveDirection, currentPositionStack: Array<GameBlock>): boolean {
    let canMoveFromHere = true;
    currentPositionStack.forEach(block => {
      if (!block.canMoveFromHere(blockToMove, direction)) {
        canMoveFromHere = false;
      }
    });
    return canMoveFromHere;
  }
  public executeCanMoveToHere(blockToMove: GameBlock, direction: MoveDirection, newPositionStack: Array<GameBlock>): boolean {
    let canMoveToHere = true;
    newPositionStack.forEach(block => {
      if (!block.canMoveToHere(blockToMove, direction)) {
        canMoveToHere = false;
      }
    });
    return canMoveToHere;
  }
  private executePreCheckEvent(blockToMove: GameBlock, direction: MoveDirection, blockStack: Array<GameBlock>) {
    blockStack.forEach(element => {
      element.preCheckEvent(blockToMove, direction, blockStack);
    });
  }
  private executePreMoveEvent(blockToMove: GameBlock, direction: MoveDirection, blockStack: Array<GameBlock>) {
    blockStack.forEach(element => {
      element.preMoveEvent(blockToMove, direction, blockStack);
    });
  }
  private executePostMoveEvent(blockToMove: GameBlock, direction: MoveDirection, blockStack: Array<GameBlock>) {
    blockStack.forEach(element => {
      element.postMoveEvent(blockToMove, direction, blockStack);
    });
  }
  public getNewPosition(position: number[], direction: MoveDirection): number[] {
    const newPosition = Object.assign([], position);
    switch (direction) {
      case MoveDirection.north:
        newPosition[0] += -1;
        break;
      case MoveDirection.south:
        newPosition[0] += 1;
        break;
      case MoveDirection.east:
        newPosition[1] += 1;
        break;
      case MoveDirection.west:
        newPosition[1] += -1;
        break;
    }
    if (this.tiles.length <= newPosition[0] || this.tiles[0].length <= newPosition[1]) {
      return position;
    }
    return newPosition;
  }
  public getLastPosition(position: number[], direction: MoveDirection): number[] {
    let newDirection: MoveDirection;
    switch (direction) {
      case MoveDirection.north:
        newDirection = MoveDirection.south;
        break;
      case MoveDirection.south:
        newDirection = MoveDirection.north;
        break;
      case MoveDirection.east:
        newDirection = MoveDirection.west;
        break;
      case MoveDirection.west:
        newDirection = MoveDirection.east;
        break;
    }
    return this.getNewPosition(position, newDirection);
  }
  public getInventoryItems(): Array<Array<GameBlock>> {
    return this.inventory.getInventoryItems(4);
  }
  public getInventory(): InventoryHandlerService {
    return this.inventory;
  }
  public createNewBlockAtPosition(block: GameBlock, position: Array<number>) {
    const newBlockInstance = Object.create(block);
    newBlockInstance.getInstance(this);
    if (block instanceof Player) {
      const emptyBlock = new EmptyBlock(this);
      this.tiles[position[0]][position[1]][StackLayer.block] = emptyBlock;
      const emptyBlock2 = new EmptyBlock(this);
      if (this.player != null) {
        const oldPlayerPosition = this.getBlockPosition(this.player);
        this.tiles[oldPlayerPosition[0]][oldPlayerPosition[1]][StackLayer.player] = emptyBlock2;
      }
      this.player = newBlockInstance;
    } else if (block.getStackZCoord() === StackLayer.block && this.getBlockPosition(this.player).positionEqual(position)) {
      const emptyBlock = new EmptyBlock(this);
      this.tiles[position[0]][position[1]][StackLayer.player] = emptyBlock;
      this.player = null;
    }
    const zPosition = newBlockInstance.getStackZCoord();
    this.tiles[position[0]][position[1]][zPosition] = newBlockInstance;
  }
}
