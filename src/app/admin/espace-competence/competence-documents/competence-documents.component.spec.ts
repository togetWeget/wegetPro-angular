import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceDocumentsComponent } from './competence-documents.component';

describe('CompetenceDocumentsComponent', () => {
  let component: CompetenceDocumentsComponent;
  let fixture: ComponentFixture<CompetenceDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetenceDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
