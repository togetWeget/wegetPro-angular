import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonneSpecialComponent } from './abonne-special.component';

describe('AbonneSpecialComponent', () => {
  let component: AbonneSpecialComponent;
  let fixture: ComponentFixture<AbonneSpecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonneSpecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonneSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
