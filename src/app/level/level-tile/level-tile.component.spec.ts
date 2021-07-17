import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelTileComponent } from './level-tile.component';
describe('LevelTileComponent', () => {
  let component: LevelTileComponent;
  let fixture: ComponentFixture<LevelTileComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelTileComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LevelTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
