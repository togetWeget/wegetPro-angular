import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFormationEcoleComponent } from './card-formation-ecole.component';

describe('CardFormationEcoleComponent', () => {
  let component: CardFormationEcoleComponent;
  let fixture: ComponentFixture<CardFormationEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFormationEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFormationEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
