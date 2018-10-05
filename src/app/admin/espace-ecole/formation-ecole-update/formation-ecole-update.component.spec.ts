import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationEcoleUpdateComponent } from './formation-ecole-update.component';

describe('FormationEcoleUpdateComponent', () => {
  let component: FormationEcoleUpdateComponent;
  let fixture: ComponentFixture<FormationEcoleUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationEcoleUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationEcoleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
