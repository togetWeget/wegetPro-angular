import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCompteComponent } from './details-compte.component';

describe('DetailsCompteComponent', () => {
  let component: DetailsCompteComponent;
  let fixture: ComponentFixture<DetailsCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
