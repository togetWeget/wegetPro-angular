import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetInfoComponent } from './widget-info.component';

describe('WidgetInfoComponent', () => {
  let component: WidgetInfoComponent;
  let fixture: ComponentFixture<WidgetInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
