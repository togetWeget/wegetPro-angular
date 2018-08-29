import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceFormationComponent } from './competence-formation.component';

describe('CompetenceFormationComponent', () => {
  let component: CompetenceFormationComponent;
  let fixture: ComponentFixture<CompetenceFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetenceFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
