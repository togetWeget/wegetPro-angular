import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBlockComponent } from './detail-block.component';

describe('DetailBlockComponent', () => {
  let component: DetailBlockComponent;
  let fixture: ComponentFixture<DetailBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
