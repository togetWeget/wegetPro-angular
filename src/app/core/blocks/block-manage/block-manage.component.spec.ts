import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockManageComponent } from './block-manage.component';

describe('BlockManageComponent', () => {
  let component: BlockManageComponent;
  let fixture: ComponentFixture<BlockManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
