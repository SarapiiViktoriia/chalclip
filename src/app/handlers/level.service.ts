import { HttpClient } from '@angular/common/http';
import { GameBlockFactory } from './../helper/GameBlockFactory';
import { Player } from '../models/gameBlocks/player';
import { InventoryHandlerService } from './inventory.service';
import { EmptyBlock } from '../models/gameBlocks/empty-block';
import { MoveDirection } from '../models/move-direction';
import { GameBlock } from '../models/gameBlocks/game-block';
import { Injectable } from '@angular/core';
import { StackLayer } from '../models/stackLayer';
import JsonLevelList from '../../assets/levels/levelList.json';
@Injectable({
  providedIn: 'root'
})
export class LevelHandlerService {
  private tiles: GameBlock[][][] = new Array<Array<Array<GameBlock>>>(0);
  public player: Player;
  protected inventory: InventoryHandlerService = new InventoryHandlerService();
  public levelName: string;
  private levelList: Array<string> = JsonLevelList;
  constructor(private http: HttpClient) {
    this.loadLevel();
  }
  public deserialize(input: LevelHandlerService): LevelHandlerService {
    this.levelName = input.levelName;
    for (let yPosition = 0; yPosition < 9; yPosition++) {
      const column: GameBlock[][] = new Array<Array<GameBlock>>();
      for (let xPosition = 0; xPosition < 9; xPosition++) {
        const pane: GameBlock[] = new Array<GameBlock>();
        for (let zPosition = 0; zPosition < Object.keys(StackLayer).length / 2; zPosition++) {
          const tmpObj = input.tiles[yPosition][xPosition][zPosition];
          pane.push(GameBlockFactory.createGameBlock(tmpObj, this));
          if (pane[zPosition] instanceof Player) {
            this.player = pane[zPosition];
          }
        }
        column.push(pane);
      }
      this.tiles.push(column);
    }
    return this;
  }
  private loadLevel() {
    if (!this.levelName) {
      this.levelName = this.levelList[0];
    } else {
      const index = this.levelList.indexOf(this.levelName);
      if (this.levelList.length < index + 1) {
      } else {
        this.levelName = this.levelList[index + 1];
      }
    }
    this.http.get(`../../assets/levels/${this.levelName}.json`).subscribe(
      level => {
        this.deserialize(level as LevelHandlerService);
      });
  }
  public getLevelGridTiles(): GameBlock[][][] {
    return this.tiles;
  }
  public getZStack(position: Array<number>): Array<GameBlock> {
    return this.tiles[position[0]][position[1]];
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
      if (block !== undefined) {
        if (!block.canMoveFromHere(blockToMove, direction)) {
          canMoveFromHere = false;
        }
      }
    });
    return canMoveFromHere;
  }
  public executeCanMoveToHere(blockToMove: GameBlock, direction: MoveDirection, newPositionStack: Array<GameBlock>): boolean {
    let canMoveToHere = true;
    newPositionStack.forEach(block => {
      if (block !== undefined) {
        if (!block.canMoveToHere(blockToMove, direction)) {
          canMoveToHere = false;
        }
      }
    });
    return canMoveToHere;
  }
  private executePreCheckEvent(blockToMove: GameBlock, direction: MoveDirection, blockStack: Array<GameBlock>) {
    blockStack.forEach(element => {
      if (element !== undefined) {
        element.preCheckEvent(blockToMove, direction, blockStack);
      }
    });
  }
  private executePreMoveEvent(blockToMove: GameBlock, direction: MoveDirection, blockStack: Array<GameBlock>) {
    blockStack.forEach(element => {
      if (element !== undefined) {
        element.preMoveEvent(blockToMove, direction, blockStack);
      }
    });
  }
  private executePostMoveEvent(blockToMove: GameBlock, direction: MoveDirection, blockStack: Array<GameBlock>) {
    blockStack.forEach(element => {
      if (element !== undefined) {
        element.postMoveEvent(blockToMove, direction, blockStack);
      }
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
    const newBlockInstance = GameBlockFactory.createGameBlock(block, this);
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
  public serializeLevel(): string {
    return JSON.stringify(this, this.replacer);
  }
  public replacer(key: string, value: any) {
    const ignoredProperties = [
      'levelHandler',
      'http'
    ];
    if (ignoredProperties.includes(key)) {
      return undefined;
    }
    return value;
  }
}
