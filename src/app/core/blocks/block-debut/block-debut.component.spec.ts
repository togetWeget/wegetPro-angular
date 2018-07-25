import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDebutComponent } from './block-debut.component';

describe('BlockDebutComponent', () => {
  let component: BlockDebutComponent;
  let fixture: ComponentFixture<BlockDebutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockDebutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockDebutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
