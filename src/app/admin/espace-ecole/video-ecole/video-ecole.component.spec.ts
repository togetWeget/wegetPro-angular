import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoEcoleComponent } from './video-ecole.component';

describe('VideoEcoleComponent', () => {
  let component: VideoEcoleComponent;
  let fixture: ComponentFixture<VideoEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
