import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoEcoleAddComponent } from './video-ecole-add.component';

describe('VideoEcoleAddComponent', () => {
  let component: VideoEcoleAddComponent;
  let fixture: ComponentFixture<VideoEcoleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoEcoleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoEcoleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
