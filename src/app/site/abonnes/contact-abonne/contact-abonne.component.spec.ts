import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAbonneComponent } from './contact-abonne.component';

describe('ContactAbonneComponent', () => {
  let component: ContactAbonneComponent;
  let fixture: ComponentFixture<ContactAbonneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactAbonneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
