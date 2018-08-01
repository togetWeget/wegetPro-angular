import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWidgetOneComponent } from './admin-widget-one.component';

describe('AdminWidgetOneComponent', () => {
  let component: AdminWidgetOneComponent;
  let fixture: ComponentFixture<AdminWidgetOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWidgetOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWidgetOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
