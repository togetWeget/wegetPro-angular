import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockEditerComponent } from './block-editer.component';

describe('BlockEditerComponent', () => {
  let component: BlockEditerComponent;
  let fixture: ComponentFixture<BlockEditerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockEditerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
