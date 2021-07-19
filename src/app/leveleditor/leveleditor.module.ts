import { HttpClientModule } from '@angular/common/http';
import { OptionsComponent } from './options/options.component';
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
    ItemsSidebarComponent,
    OptionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [OptionsComponent]
})
export class LeveleditorPageModule { }
