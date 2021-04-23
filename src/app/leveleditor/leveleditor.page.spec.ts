import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LeveleditorPage } from './leveleditor.page';
describe('LeveleditorPage', () => {
  let component: LeveleditorPage;
  let fixture: ComponentFixture<LeveleditorPage>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeveleditorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LeveleditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
