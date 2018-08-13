import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilAbonneComponent } from './profil-abonne.component';

describe('ProfilAbonneComponent', () => {
  let component: ProfilAbonneComponent;
  let fixture: ComponentFixture<ProfilAbonneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilAbonneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
