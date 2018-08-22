import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReabonneComponent } from './reabonne.component';

describe('ReabonneComponent', () => {
  let component: ReabonneComponent;
  let fixture: ComponentFixture<ReabonneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReabonneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReabonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
