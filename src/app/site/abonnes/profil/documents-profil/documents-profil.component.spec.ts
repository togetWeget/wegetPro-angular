import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsProfilComponent } from './documents-profil.component';

describe('DocumentsProfilComponent', () => {
  let component: DocumentsProfilComponent;
  let fixture: ComponentFixture<DocumentsProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
