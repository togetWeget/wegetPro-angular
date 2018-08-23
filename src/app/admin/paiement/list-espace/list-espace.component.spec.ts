import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceComponent } from './list-espace.component';

describe('ListEspaceComponent', () => {
  let component: ListEspaceComponent;
  let fixture: ComponentFixture<EspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
