import { OptionsComponent } from './../options/options.component';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameBlock } from 'src/app/models/gameBlocks/game-block';
import { Player } from 'src/app/models/gameBlocks/player';
import { MoveableBlock } from 'src/app/models/gameBlocks/moveable-block';
import { SolidBlock } from 'src/app/models/gameBlocks/solid-block';
import { WoodBackground } from 'src/app/models/gameBlocks/background/wood-background';
import { LevelHandlerService } from 'src/app/handlers/level.service';
@Component({
  selector: 'app-items-sidebar',
  templateUrl: './items-sidebar.component.html',
  styleUrls: ['./items-sidebar.component.scss'],
})
export class ItemsSidebarComponent implements OnInit {
  public chipsChallenge1Items: Array<GameBlock> = new Array(0);
  @Output() itemSelect = new EventEmitter<GameBlock>();
  constructor(
    private levelHandler: LevelHandlerService,
    private modalController: ModalController,
    private http: HttpClient) { }
  ngOnInit() {
    this.chipsChallenge1Items.push(
      new Player(this.levelHandler), 
      new MoveableBlock(this.levelHandler),
      new SolidBlock(this.levelHandler),
      new WoodBackground(this.levelHandler)
    );
    console.log('Loaded items', this.chipsChallenge1Items);
  }
  itemClicked(item: GameBlock) {
    console.log('selected item:', item);
    this.itemSelect.emit(item);
  }
  public optionsClicked() {
    this.presentModal();
  }
  private async presentModal() {
    const modal = await this.modalController.create({
      component: OptionsComponent,
      componentProps: {
        levelHandler: this.levelHandler,
        http: this.http
      }
    });
    return await modal.present();
  }
}
