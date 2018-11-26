import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubProfilComponent } from './pub-profil.component';

describe('PubProfilComponent', () => {
  let component: PubProfilComponent;
  let fixture: ComponentFixture<PubProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
