import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationEcoleAddComponent } from './formation-ecole-add.component';

describe('FormationEcoleAddComponent', () => {
  let component: FormationEcoleAddComponent;
  let fixture: ComponentFixture<FormationEcoleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationEcoleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationEcoleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
