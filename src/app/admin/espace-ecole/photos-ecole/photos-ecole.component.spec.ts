import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosEcoleComponent } from './photos-ecole.component';

describe('PhotosEcoleComponent', () => {
  let component: PhotosEcoleComponent;
  let fixture: ComponentFixture<PhotosEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
