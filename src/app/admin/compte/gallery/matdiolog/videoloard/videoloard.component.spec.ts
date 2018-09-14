import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoloardComponent } from './videoloard.component';

describe('VideoloardComponent', () => {
  let component: VideoloardComponent;
  let fixture: ComponentFixture<VideoloardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoloardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoloardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
