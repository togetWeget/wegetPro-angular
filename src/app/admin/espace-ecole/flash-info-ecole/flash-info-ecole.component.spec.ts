import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashInfoEcoleComponent } from './flash-info-ecole.component';

describe('FlashInfoEcoleComponent', () => {
  let component: FlashInfoEcoleComponent;
  let fixture: ComponentFixture<FlashInfoEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashInfoEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashInfoEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
