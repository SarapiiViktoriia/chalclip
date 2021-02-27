import { LevelHandlerService } from 'src/app/handlers/level-handler.service';
import { Component } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage {
  public levelHandler: LevelHandlerService;
  public fileName: string;
  public levelFile: File;
  constructor(private fileChooser: FileChooser) {
  }
  public uploadLevel() {
  }
  public downloadLevel() {
    const jsonLevel = this.levelHandler.serializeLevel();
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/json;charset=utf-8,${encodeURIComponent(jsonLevel)}`);
    element.setAttribute('download', `${this.fileName}.json`);
    const event = new MouseEvent('click');
    element.dispatchEvent(event);
  }
}
