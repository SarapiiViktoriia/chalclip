import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { OptionsPage } from './options.page';
const routes: Routes = [
  {
    path: '',
    component: OptionsPage
  }
];
@NgModule({
  declarations: [
    OptionsPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    OptionsPage
  ]
})
export class OptionsPageModule { }
