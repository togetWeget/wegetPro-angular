import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentEcoleAddComponent } from './document-ecole-add.component';

describe('DocumentEcoleAddComponent', () => {
  let component: DocumentEcoleAddComponent;
  let fixture: ComponentFixture<DocumentEcoleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentEcoleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentEcoleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
