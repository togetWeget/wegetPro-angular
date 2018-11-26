import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEcoleComponent } from './detail-ecole.component';

describe('DetailEcoleComponent', () => {
  let component: DetailEcoleComponent;
  let fixture: ComponentFixture<DetailEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
