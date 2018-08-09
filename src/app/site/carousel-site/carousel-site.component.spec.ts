import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselSiteComponent } from './carousel-site.component';

describe('CarouselSiteComponent', () => {
  let component: CarouselSiteComponent;
  let fixture: ComponentFixture<CarouselSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
