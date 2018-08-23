import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBlockComponent } from './formule.component';

describe('DetailBlockComponent', () => {
  let component: FormuleComponent;
  let fixture: ComponentFixture<FormuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
