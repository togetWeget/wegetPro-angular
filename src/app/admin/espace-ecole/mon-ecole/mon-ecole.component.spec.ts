import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonEcoleComponent } from './mon-ecole.component';

describe('MonEcoleComponent', () => {
  let component: MonEcoleComponent;
  let fixture: ComponentFixture<MonEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
