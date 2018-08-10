import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTarifsComponent } from './admin-tarifs.component';

describe('AdminTarifsComponent', () => {
  let component: AdminTarifsComponent;
  let fixture: ComponentFixture<AdminTarifsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTarifsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTarifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
