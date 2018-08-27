import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceImmobilierComponent } from './espace-immobilier.component';

describe('EspaceImmobilierComponent', () => {
  let component: EspaceImmobilierComponent;
  let fixture: ComponentFixture<EspaceImmobilierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceImmobilierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceImmobilierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
