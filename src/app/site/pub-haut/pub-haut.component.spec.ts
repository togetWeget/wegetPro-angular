import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubHautComponent } from './pub-haut.component';

describe('PubHautComponent', () => {
  let component: PubHautComponent;
  let fixture: ComponentFixture<PubHautComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubHautComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubHautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
