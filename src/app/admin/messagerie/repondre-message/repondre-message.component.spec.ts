import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepondreMessageComponent } from './repondre-message.component';

describe('RepondreMessageComponent', () => {
  let component: RepondreMessageComponent;
  let fixture: ComponentFixture<RepondreMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepondreMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepondreMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
