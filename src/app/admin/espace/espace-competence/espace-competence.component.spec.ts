import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceCompetenceComponent } from './espace-competence.component';

describe('EspaceCompetenceComponent', () => {
  let component: EspaceCompetenceComponent;
  let fixture: ComponentFixture<EspaceCompetenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceCompetenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
