import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMessageComponent } from './layout-message.component';

describe('LayoutMessageComponent', () => {
  let component: LayoutMessageComponent;
  let fixture: ComponentFixture<LayoutMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
