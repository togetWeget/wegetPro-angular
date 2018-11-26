import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoEcoleAddComponent } from './photo-ecole-add.component';

describe('PhotoEcoleAddComponent', () => {
  let component: PhotoEcoleAddComponent;
  let fixture: ComponentFixture<PhotoEcoleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoEcoleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoEcoleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
