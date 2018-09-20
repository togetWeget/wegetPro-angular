import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieEcoleComponent } from './categorie-ecole.component';

describe('CategorieEcoleComponent', () => {
  let component: CategorieEcoleComponent;
  let fixture: ComponentFixture<CategorieEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorieEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
