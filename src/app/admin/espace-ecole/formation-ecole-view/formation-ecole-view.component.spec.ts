import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationEcoleViewComponent } from './formation-ecole-view.component';

describe('FormationEcoleViewComponent', () => {
  let component: FormationEcoleViewComponent;
  let fixture: ComponentFixture<FormationEcoleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationEcoleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationEcoleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
