import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocEcoleComponent } from './doc-ecole.component';

describe('DocEcoleComponent', () => {
  let component: DocEcoleComponent;
  let fixture: ComponentFixture<DocEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
