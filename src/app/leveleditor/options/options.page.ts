import { LevelHandlerService } from 'src/app/handlers/level.service';
import { LevelSaverService } from '../../handlers/level-saver.service';
import { NavController, NavParams } from '@ionic/angular';
import { Component } from '@angular/core';
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
    public levelService: LevelSaverService,
    public navParams: NavParams
  ) { }
  public changeLevelFile($event): void {
    this.levelFile = $event.target.files[0];
  }
  public uploadLevel() {
    const reader = new FileReader();
    reader.readAsText(this.levelFile, 'UTF-8');
    reader.onload = (evt) => {
      const jsonLevel = JSON.parse(reader.result.toString());
      this.levelHandler.deserialize(jsonLevel);
    };
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
