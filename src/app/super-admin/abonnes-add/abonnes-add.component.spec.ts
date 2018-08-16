import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnesAddComponent } from './abonnes-add.component';

describe('AbonnesAddComponent', () => {
  let component: AbonnesAddComponent;
  let fixture: ComponentFixture<AbonnesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonnesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonnesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
