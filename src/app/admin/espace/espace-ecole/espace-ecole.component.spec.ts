import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceEcoleComponent } from './espace-ecole.component';

describe('EspaceEcoleComponent', () => {
  let component: EspaceEcoleComponent;
  let fixture: ComponentFixture<EspaceEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
