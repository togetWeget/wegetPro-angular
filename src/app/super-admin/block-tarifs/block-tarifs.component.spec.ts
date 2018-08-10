import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTarifsComponent } from './block-tarifs.component';

describe('BlockTarifsComponent', () => {
  let component: BlockTarifsComponent;
  let fixture: ComponentFixture<BlockTarifsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockTarifsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockTarifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
