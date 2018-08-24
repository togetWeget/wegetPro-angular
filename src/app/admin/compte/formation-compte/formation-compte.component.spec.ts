import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationCompteComponent } from './formation-compte.component';

describe('FormationCompteComponent', () => {
  let component: FormationCompteComponent;
  let fixture: ComponentFixture<FormationCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
