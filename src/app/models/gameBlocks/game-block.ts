import { levelEditorSetting } from 'src/app/helper/levelEditorSettingsProperty';
import { StackLayer } from './../stackLayer';
import { MoveDirection } from './../move-direction';
import { LevelHandlerService } from '../../handlers/level.service';
import 'reflect-metadata';
export abstract class GameBlock {
  public static '@type' = 'abstract';
  public '@type' = 'abstract';
  @levelEditorSetting()
  private imageSource: string;
  protected levelHandler: LevelHandlerService;
  constructor(levelHandler: LevelHandlerService) {
    this.levelHandler = levelHandler;
    this.imageSource = 'assets/default.bmp';
  }
  public abstract readonly name: string;
  public deserialize(input: GameBlock, parameters: Array<object>): GameBlock {
    this.imageSource = input.imageSource;
    this.levelHandler = input.levelHandler;
    parameters.forEach(element => {
      if (element instanceof LevelHandlerService) {
        this.levelHandler = element;
      }
    });
    return this;
  }
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
  public abstract getStackZCoord(): StackLayer;
  public getSettings() {
    const fields = Array<string>();
    let target = Object.getPrototypeOf(this);
    while (target !== Object.prototype) {
      const childFields = Reflect.getOwnMetadata('levelEditorSetting', target) || []; 
      childFields.forEach(element => {
        fields.push(element);
        fields.push(typeof target[element]);
      });
      target = Object.getPrototypeOf(target);
    }
    return fields;
  }
}
