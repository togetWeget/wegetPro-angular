import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMessageEnvoyeComponent } from './liste-message-envoye.component';

describe('ListeMessageEnvoyeComponent', () => {
  let component: ListeMessageEnvoyeComponent;
  let fixture: ComponentFixture<ListeMessageEnvoyeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeMessageEnvoyeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeMessageEnvoyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
