import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAbonnesBlockComponent } from './list-abonnes-block.component';

describe('ListAbonnesBlockComponent', () => {
  let component: ListAbonnesBlockComponent;
  let fixture: ComponentFixture<ListAbonnesBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAbonnesBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAbonnesBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
