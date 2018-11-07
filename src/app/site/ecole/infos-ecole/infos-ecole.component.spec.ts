import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosEcoleComponent } from './infos-ecole.component';

describe('InfosEcoleComponent', () => {
  let component: InfosEcoleComponent;
  let fixture: ComponentFixture<InfosEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
