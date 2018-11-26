import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperModalComponent } from './super-modal.component';

describe('SuperModalComponent', () => {
  let component: SuperModalComponent;
  let fixture: ComponentFixture<SuperModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
