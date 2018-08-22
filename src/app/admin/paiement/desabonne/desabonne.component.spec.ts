import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesabonneComponent } from './desabonne.component';

describe('DesabonneComponent', () => {
  let component: DesabonneComponent;
  let fixture: ComponentFixture<DesabonneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesabonneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesabonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
