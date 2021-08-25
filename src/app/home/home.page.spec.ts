import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { LevelGridComponent } from '../level/level-grid/level-grid.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LevelStatusSidebarComponent } from '../level/level-status-sidebar/level-status-sidebar.component';
describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePage,
        LevelGridComponent,
        SidebarComponent,
        LevelStatusSidebarComponent
      ],
      imports: [IonicModule.forRoot(), HttpClientModule]
    }).compileComponents();
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
