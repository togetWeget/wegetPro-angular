import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverSelectComponent } from './cover-select.component';

describe('CoverSelectComponent', () => {
  let component: CoverSelectComponent;
  let fixture: ComponentFixture<CoverSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
