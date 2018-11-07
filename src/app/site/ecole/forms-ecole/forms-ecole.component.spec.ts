import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEcoleComponent } from './forms-ecole.component';

describe('FormsEcoleComponent', () => {
  let component: FormsEcoleComponent;
  let fixture: ComponentFixture<FormsEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
