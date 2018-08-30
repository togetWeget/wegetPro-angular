import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationsEcoleComponent } from './formations-ecole.component';

describe('FormationsEcoleComponent', () => {
  let component: FormationsEcoleComponent;
  let fixture: ComponentFixture<FormationsEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationsEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationsEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
