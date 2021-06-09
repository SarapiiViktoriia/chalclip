import { HttpClientModule, HttpClient } from '@angular/common/http';
import { OptionsPage } from './options/options.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LeveleditorPage } from './leveleditor.page';
import { LevelGridComponent } from '../level/level-grid/level-grid.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ItemsSidebarComponent } from './items-sidebar/items-sidebar.component';
const routes: Routes = [
  {
    path: '',
    component: LeveleditorPage
  }
];
@NgModule({
  declarations: [
    LeveleditorPage,
    LevelGridComponent,
    SidebarComponent,
    ItemsSidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    OptionsPage
  ],
  entryComponents: [OptionsPage]
})
export class LeveleditorPageModule { }
