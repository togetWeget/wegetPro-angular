import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutImmobilierComponent } from './layout-immobilier.component';

describe('LayoutImmobilierComponent', () => {
  let component: LayoutImmobilierComponent;
  let fixture: ComponentFixture<LayoutImmobilierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutImmobilierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutImmobilierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
