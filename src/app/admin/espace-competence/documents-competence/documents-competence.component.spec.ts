import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsCompetenceComponent } from './documents-competence.component';

describe('DocumentsCompetenceComponent', () => {
  let component: DocumentsCompetenceComponent;
  let fixture: ComponentFixture<DocumentsCompetenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsCompetenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
