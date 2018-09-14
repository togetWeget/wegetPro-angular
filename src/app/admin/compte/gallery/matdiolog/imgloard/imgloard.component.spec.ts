import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgloardComponent } from './imgloard.component';

describe('ImgloardComponent', () => {
  let component: ImgloardComponent;
  let fixture: ComponentFixture<ImgloardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgloardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgloardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
