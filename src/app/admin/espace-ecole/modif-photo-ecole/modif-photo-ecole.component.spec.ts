import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifPhotoEcoleComponent } from './modif-photo-ecole.component';

describe('ModifPhotoEcoleComponent', () => {
  let component: ModifPhotoEcoleComponent;
  let fixture: ComponentFixture<ModifPhotoEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifPhotoEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifPhotoEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
