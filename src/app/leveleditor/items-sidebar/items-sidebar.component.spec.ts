import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsSidebarComponent } from './items-sidebar.component';
describe('ItemsSidebarComponent', () => {
  let component: ItemsSidebarComponent;
  let fixture: ComponentFixture<ItemsSidebarComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsSidebarComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
