import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceAnnonceComponent } from './espace-annonce.component';

describe('EspaceAnnonceComponent', () => {
  let component: EspaceAnnonceComponent;
  let fixture: ComponentFixture<EspaceAnnonceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceAnnonceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
