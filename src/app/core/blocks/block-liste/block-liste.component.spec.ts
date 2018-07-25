import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockListeComponent } from './block-liste.component';

describe('BlockListeComponent', () => {
  let component: BlockListeComponent;
  let fixture: ComponentFixture<BlockListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
