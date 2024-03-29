import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionsComponent } from './options.component';
import { Location } from '@angular/common';
describe('OptionsPage', () => {
  let component: OptionsComponent;
  let fixture: ComponentFixture<OptionsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Location],
      declarations: [OptionsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
