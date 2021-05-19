import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LeveleditorPage } from './leveleditor.page';
import { LevelGridComponent } from '../level/level-grid/level-grid.component';
const routes: Routes = [
  {
    path: '',
    component: LeveleditorPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LeveleditorPage,
    LevelGridComponent
  ]
})
export class LeveleditorPageModule {}
