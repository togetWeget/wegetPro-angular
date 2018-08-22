import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverProfilComponent } from './cover-profil.component';

describe('CoverProfilComponent', () => {
  let component: CoverProfilComponent;
  let fixture: ComponentFixture<CoverProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
