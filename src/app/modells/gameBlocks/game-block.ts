import { StackLayer } from './../stackLayer';
import { MoveDirection } from './../move-direction';
import { LevelHandlerService } from './../../handlers/level-handler.service';
export abstract class GameBlock {
  private imageSource: string;
  public levelHandler: LevelHandlerService;
  constructor(levelHandler: LevelHandlerService) {
    this.levelHandler = levelHandler;
    this.imageSource = 'assets/default.bmp';
  }
  public abstract name: string;
  public canMoveFromHere(blockToMove: GameBlock, direction: MoveDirection): boolean {
    return true;
  }
  public canMoveToHere(blockToMove: GameBlock, direction: MoveDirection): boolean {
    return false;
  }
  public preCheckEvent(blockToMove: GameBlock, direction: MoveDirection, blockStack: Array<GameBlock>) { }
  public preMoveEvent(blockToMove: GameBlock, direction: MoveDirection, blockStack: Array<GameBlock>) { }
  public postMoveEvent(blockToMove: GameBlock, direction: MoveDirection, blockStack: Array<GameBlock>) { }
  public get $imageSource(): string {
    return this.imageSource;
  }
  public set $imageSource(value: string) {
    this.imageSource = value;
  }
  public getStackZCoord(): StackLayer {
    return null;
  }
}
