import { Player } from './../models/gameBlocks/player';
import { InventoryHandlerService } from './inventory-handler.service';
import { EmptyBlock } from './../models/gameBlocks/empty-block';
import { MoveDirection } from './../models/move-direction';
import { GameBlock } from './../models/gameBlocks/game-block';
import { WoodBackground } from '../models/gameBlocks/Background/wood-background';
import { MoveableBlock } from '../models/gameBlocks/moveable-block';
import { SolidBlock } from '../models/gameBlocks/solid-block';
import { Injectable } from '@angular/core';
import { StackLayer } from '../models/stackLayer';
@Injectable({
  providedIn: 'root'
})
export class LevelHandlerService {
  private stack: GameBlock[][][] = new Array<Array<Array<GameBlock>>>(0);
  public player: Player;
  protected inventory: InventoryHandlerService = new InventoryHandlerService();
  constructor() {
    this.loadLevel();
  }
  public loadLevel() {
    for (let y = 0; y < 9; y++) {
      this.stack[y] = new Array<Array<GameBlock>>(0);
      for (let x = 0; x < 9; x++) {
        this.stack[y][x] = new Array<GameBlock>(Object.keys(StackLayer).length / 2);
        this.stack[y][x][StackLayer.texture] = new WoodBackground(this);
        this.stack[y][x][StackLayer.block] = new EmptyBlock(this);
        this.stack[y][x][StackLayer.player] = new EmptyBlock(this);
      }
    }
    this.player = new Player(this);
    this.stack[4][4][StackLayer.player] = this.player;
    this.stack[4][5][StackLayer.block] = new SolidBlock(this);
    this.stack[4][3][StackLayer.block] = new MoveableBlock(this);
    this.stack[4][2][StackLayer.block] = new MoveableBlock(this);
    this.stack[4][1][StackLayer.block] = new SolidBlock(this);
  }
  public getStack(): GameBlock[][][] {
    return this.stack;
  }
  public getZStack(position: Array<number>): Array<GameBlock> {
    return this.stack[position[0]][position[1]];
  }
  public getBlockPosition(block: GameBlock): number[] {
    const location = new Array(3);
    this.stack.forEach((element, yCoord) => {
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
    this.stack[newPosition[0]][newPosition[1]][newPosition[2]] = block;
    const newEmptyBlock = new EmptyBlock(this);
    this.stack[currentPosition[0]][currentPosition[1]][currentPosition[2]] = newEmptyBlock;
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
      case MoveDirection.moveNorth:
        newPosition[0] += -1;
        break;
      case MoveDirection.moveSouth:
        newPosition[0] += 1;
        break;
      case MoveDirection.moveEast:
        newPosition[1] += 1;
        break;
      case MoveDirection.moveWest:
        newPosition[1] += -1;
        break;
    }
    if (this.stack.length <= newPosition[0] || this.stack[0].length <= newPosition[1]) {
      return position;
    }
    return newPosition;
  }
  public getLastPosition(position: number[], direction: MoveDirection): number[] {
    let newDirection: MoveDirection;
    switch (direction) {
      case MoveDirection.moveNorth:
        newDirection = MoveDirection.moveSouth;
        break;
      case MoveDirection.moveSouth:
        newDirection = MoveDirection.moveNorth;
        break;
      case MoveDirection.moveEast:
        newDirection = MoveDirection.moveWest;
        break;
      case MoveDirection.moveWest:
        newDirection = MoveDirection.moveEast;
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
      this.stack[position[0]][position[1]][StackLayer.block] = emptyBlock;
      const emptyBlock2 = new EmptyBlock(this);
      if (this.player != null) {
        const oldPlayerPosition = this.getBlockPosition(this.player);
        this.stack[oldPlayerPosition[0]][oldPlayerPosition[1]][StackLayer.player] = emptyBlock2;
      }
      this.player = newBlockInstance;
    } else if (block.getStackZCoord() === StackLayer.block && this.getBlockPosition(this.player).positionEqual(position)) {
      const emptyBlock = new EmptyBlock(this);
      this.stack[position[0]][position[1]][StackLayer.player] = emptyBlock;
      this.player = null;
    }
    const zPosition = newBlockInstance.getStackZCoord();
    this.stack[position[0]][position[1]][zPosition] = newBlockInstance;
  }
}
