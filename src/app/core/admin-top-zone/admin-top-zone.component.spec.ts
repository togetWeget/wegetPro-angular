import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTopZoneComponent } from './admin-top-zone.component';

describe('AdminTopZoneComponent', () => {
  let component: AdminTopZoneComponent;
  let fixture: ComponentFixture<AdminTopZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTopZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTopZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
