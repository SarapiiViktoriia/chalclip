import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelGridComponent } from './level-grid.component';
describe('LevelGridComponent', () => {
  let component: LevelGridComponent;
  let fixture: ComponentFixture<LevelGridComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelGridComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LevelGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
