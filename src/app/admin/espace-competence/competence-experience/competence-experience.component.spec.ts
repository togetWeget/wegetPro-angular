import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceExperienceComponent } from './competence-experience.component';

describe('CompetenceExperienceComponent', () => {
  let component: CompetenceExperienceComponent;
  let fixture: ComponentFixture<CompetenceExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetenceExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
