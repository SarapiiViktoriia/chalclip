import { EmptyBlock } from './../modells/gameBlocks/empty-block';
import { MoveDirection } from './../modells/move-direction';
import { GameBlock } from './../modells/gameBlocks/game-block';
import { WoodBackground } from '../modells/gameBlocks/Background/wood-background';
import { MoveableBlock } from '../modells/gameBlocks/moveable-block';
import { SolidBlock } from '../modells/gameBlocks/solid-block';
import { Player } from '../modells/gameBlocks/player';
import { Injectable } from '@angular/core';
import { StackLayer } from '../modells/stackLayer';
import { isUndefined } from 'util';
@Injectable({
  providedIn: 'root'
})
export class LevelHandlerService {
  private stack: GameBlock[][][];
  public player: Player;
  constructor() {
    this.loadLevel();
  }
  public loadLevel() {
    this.stack = new Array<Array<Array<GameBlock>>>(0);
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
  public getZStack(xCoord: number, yCoord: number): Array<GameBlock> {
    return this.stack[yCoord][xCoord];
  }
  public getBlockPosition(block: GameBlock): number[] {
    let location = [2];
    this.stack.forEach((element, yCoord) => {
      element.forEach((element2, xCoord) => {
        let zCoord = element2.indexOf(block);
        if (zCoord != -1) {
          location[0] = yCoord;
          location[1] = xCoord;
          location[2] = zCoord;
        }
      })
    });
    return location;
  }
  public moveBlock(block: GameBlock, direction: MoveDirection): boolean {
    let currentPosition = this.getBlockPosition(block);
    let currentPositionStack = this.getZStack(currentPosition[1], currentPosition[0]);
    let newPosition = this.getNewPosition(currentPosition, direction);
    if (newPosition.includes(-1) || currentPosition === newPosition) {
      return false;
    }
    let newPositionStack = this.getZStack(newPosition[1], newPosition[0]);
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
    let currentPosition = this.getBlockPosition(block);
    let newPosition = this.getNewPosition(currentPosition, direction);
    this.stack[newPosition[0]][newPosition[1]][newPosition[2]] = block;
    let newEmptyBlock = new EmptyBlock(this);
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
}
