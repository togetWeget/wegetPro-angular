import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBlocksComponent } from './list-blocks.component';

describe('ListBlocksComponent', () => {
  let component: ListBlocksComponent;
  let fixture: ComponentFixture<ListBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
