import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceProfilComponent } from './experience-profil.component';

describe('ExperienceProfilComponent', () => {
  let component: ExperienceProfilComponent;
  let fixture: ComponentFixture<ExperienceProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
