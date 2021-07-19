import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { LevelGridComponent } from '../level/level-grid/level-grid.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LevelStatusSidebarComponent } from '../level/level-status-sidebar/level-status-sidebar.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    HomePage,
    LevelGridComponent,
    SidebarComponent,
    LevelStatusSidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ]
})
export class HomePageModule { }
