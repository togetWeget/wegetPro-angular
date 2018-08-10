import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockUpdateComponent } from './block-update.component';

describe('BlockUpdateComponent', () => {
  let component: BlockUpdateComponent;
  let fixture: ComponentFixture<BlockUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
