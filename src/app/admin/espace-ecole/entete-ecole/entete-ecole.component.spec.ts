import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteteEcoleComponent } from './entete-ecole.component';

describe('EnteteEcoleComponent', () => {
  let component: EnteteEcoleComponent;
  let fixture: ComponentFixture<EnteteEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteteEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteteEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
