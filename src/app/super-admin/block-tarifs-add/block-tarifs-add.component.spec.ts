import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTarifsAddComponent } from './block-tarifs-add.component';

describe('BlockTarifsAddComponent', () => {
  let component: BlockTarifsAddComponent;
  let fixture: ComponentFixture<BlockTarifsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockTarifsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockTarifsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
