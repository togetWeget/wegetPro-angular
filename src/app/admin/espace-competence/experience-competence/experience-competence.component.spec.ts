import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceCompetenceComponent } from './experience-competence.component';

describe('ExperienceCompetenceComponent', () => {
  let component: ExperienceCompetenceComponent;
  let fixture: ComponentFixture<ExperienceCompetenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceCompetenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
