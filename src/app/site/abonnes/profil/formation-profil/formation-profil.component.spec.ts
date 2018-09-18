import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationProfilComponent } from './formation-profil.component';

describe('FormationProfilComponent', () => {
  let component: FormationProfilComponent;
  let fixture: ComponentFixture<FormationProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
