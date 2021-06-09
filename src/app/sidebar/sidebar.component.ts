import { HttpClient } from '@angular/common/http';
import { LevelHandlerService } from './../handlers/level.service';
import { OptionsPage } from './../leveleditor/options/options.page';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    private levelHandler: LevelHandlerService,
    private http: HttpClient
  ) { }
  ngOnInit() { }
  public optionsClicked() {
    this.presentModal();
  }
  private async presentModal() {
    const modal = await this.modalController.create({
      component: OptionsPage,
      componentProps: {
        levelHandler: this.levelHandler,
        http: this.http
      }
    });
    return await modal.present();
  }
}
