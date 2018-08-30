import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProComponent } from './info-pro.component';

describe('InfoProComponent', () => {
  let component: InfoProComponent;
  let fixture: ComponentFixture<InfoProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
