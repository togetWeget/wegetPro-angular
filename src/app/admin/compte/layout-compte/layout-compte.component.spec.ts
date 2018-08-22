import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCompteComponent } from './layout-compte.component';

describe('LayoutCompteComponent', () => {
  let component: LayoutCompteComponent;
  let fixture: ComponentFixture<LayoutCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
