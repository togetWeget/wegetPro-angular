import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencePhotoComponent } from './competence-photo.component';

describe('CompetencePhotoComponent', () => {
  let component: CompetencePhotoComponent;
  let fixture: ComponentFixture<CompetencePhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetencePhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetencePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
