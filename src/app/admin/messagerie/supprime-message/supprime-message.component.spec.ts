import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimeMessageComponent } from './supprime-message.component';

describe('SupprimeMessageComponent', () => {
  let component: SupprimeMessageComponent;
  let fixture: ComponentFixture<SupprimeMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupprimeMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
