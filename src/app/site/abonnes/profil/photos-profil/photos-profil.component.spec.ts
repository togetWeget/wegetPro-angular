import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosProfilComponent } from './photos-profil.component';

describe('PhotosProfilComponent', () => {
  let component: PhotosProfilComponent;
  let fixture: ComponentFixture<PhotosProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
