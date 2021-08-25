import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelStatusSidebarComponent } from './level-status-sidebar.component';
describe('LevelStatusSidebarComponent', () => {
  let component: LevelStatusSidebarComponent;
  let fixture: ComponentFixture<LevelStatusSidebarComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [LevelStatusSidebarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LevelStatusSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
