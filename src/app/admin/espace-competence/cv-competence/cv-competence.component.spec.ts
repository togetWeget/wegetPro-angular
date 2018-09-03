import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvCompetenceComponent } from './cv-competence-component';

describe('CvCompetenceComponent', () => {
  let component: CvCompetenceComponent;
  let fixture: ComponentFixture<CvCompetenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvCompetenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
