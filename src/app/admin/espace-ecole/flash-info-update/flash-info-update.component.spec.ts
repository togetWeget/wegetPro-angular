import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashInfoUpdateComponent } from './flash-info-update.component';

describe('FlashInfoUpdateComponent', () => {
  let component: FlashInfoUpdateComponent;
  let fixture: ComponentFixture<FlashInfoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashInfoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashInfoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
