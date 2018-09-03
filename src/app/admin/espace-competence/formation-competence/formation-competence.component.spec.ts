import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationCompetenceComponent } from './formation-competence.component';

describe('FormationCompetenceComponent', () => {
  let component: FormationCompetenceComponent;
  let fixture: ComponentFixture<FormationCompetenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationCompetenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
