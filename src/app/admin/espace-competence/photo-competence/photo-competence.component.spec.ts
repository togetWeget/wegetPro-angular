import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoCompetenceComponent } from './photo-competence.component';

describe('PhotoCompetenceComponent', () => {
  let component: PhotoCompetenceComponent;
  let fixture: ComponentFixture<PhotoCompetenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoCompetenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
