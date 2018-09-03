import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCompetenceComponent } from './layout-competence.component';

describe('LayoutCompetenceComponent', () => {
  let component: LayoutCompetenceComponent;
  let fixture: ComponentFixture<LayoutCompetenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCompetenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
