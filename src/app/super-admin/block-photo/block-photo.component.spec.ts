import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockPhotoComponent } from './block-photo.component';

describe('BlockPhotoComponent', () => {
  let component: BlockPhotoComponent;
  let fixture: ComponentFixture<BlockPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
