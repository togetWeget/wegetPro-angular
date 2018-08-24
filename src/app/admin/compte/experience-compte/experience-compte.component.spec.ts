import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceCompteComponent } from './experience-compte.component';

describe('ExperienceCompteComponent', () => {
  let component: ExperienceCompteComponent;
  let fixture: ComponentFixture<ExperienceCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
