import { HttpClientModule } from '@angular/common/http';
import { OptionsPage } from './options/options.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LeveleditorPage } from './leveleditor.page';
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
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  declarations: [
    LeveleditorPage,
    OptionsPage
  ],
  entryComponents: [OptionsPage]
})
export class LeveleditorPageModule { }
