import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutEcoleComponent } from './layout-ecole.component';

describe('LayoutEcoleComponent', () => {
  let component: LayoutEcoleComponent;
  let fixture: ComponentFixture<LayoutEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
