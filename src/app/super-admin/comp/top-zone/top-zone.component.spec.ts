import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopZoneComponent } from './top-zone.component';

describe('TopZoneComponent', () => {
  let component: TopZoneComponent;
  let fixture: ComponentFixture<TopZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
