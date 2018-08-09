import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApercuBlockComponent } from './apercu-block.component';

describe('ApercuBlockComponent', () => {
  let component: ApercuBlockComponent;
  let fixture: ComponentFixture<ApercuBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApercuBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApercuBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
