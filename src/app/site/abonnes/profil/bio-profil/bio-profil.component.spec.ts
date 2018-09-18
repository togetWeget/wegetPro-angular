import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BioProfilComponent } from './bio-profil.component';

describe('BioProfilComponent', () => {
  let component: BioProfilComponent;
  let fixture: ComponentFixture<BioProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
