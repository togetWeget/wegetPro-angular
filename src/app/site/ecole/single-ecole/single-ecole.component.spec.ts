import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEcoleComponent } from './single-ecole.component';

describe('SingleEcoleComponent', () => {
  let component: SingleEcoleComponent;
  let fixture: ComponentFixture<SingleEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
