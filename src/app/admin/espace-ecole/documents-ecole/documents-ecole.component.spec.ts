import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsEcoleComponent } from './documents-ecole.component';

describe('DocumentsEcoleComponent', () => {
  let component: DocumentsEcoleComponent;
  let fixture: ComponentFixture<DocumentsEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
