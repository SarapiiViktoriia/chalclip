import { LevelService } from './../../handlers/level.service';
import { NavController, NavParams } from '@ionic/angular';
import { LevelHandlerService } from 'src/app/handlers/level-handler.service';
import { Component } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage {
  public levelHandler: LevelHandlerService;
  public levelName: string;
  public levelFile: File;
  public isSaved = false;
  constructor(
    public navCtrl: NavController,
    public levelService: LevelService,
    public navParams: NavParams
  ) { }
  public uploadLevel() {
    this.saveLevel();
  }
  public downloadLevel() {
    this.levelHandler.levelName = this.levelName;
    const jsonLevel = this.levelHandler.serializeLevel();
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/json;charset=utf-8,${encodeURIComponent(jsonLevel)}`);
    element.setAttribute('download', `${this.levelName}.json`);
    const event = new MouseEvent('click');
    element.dispatchEvent(event);
  }
  saveLevel() {
    this.levelService.saveLevel(this.levelHandler.levelName).then(() => {
      this.isSaved = true;
    });
  }
  deleteLevel() {
    this.levelService.deleteLevel(this.levelHandler.levelName).then(() => {
      this.isSaved = false;
    });
  }
}
