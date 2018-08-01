import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAbonnesComponent } from './list-abonnes.component';

describe('ListAbonnesComponent', () => {
  let component: ListAbonnesComponent;
  let fixture: ComponentFixture<ListAbonnesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAbonnesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAbonnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
