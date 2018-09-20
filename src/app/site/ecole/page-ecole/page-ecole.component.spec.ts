import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEcoleComponent } from './page-ecole.component';

describe('PageEcoleComponent', () => {
  let component: PageEcoleComponent;
  let fixture: ComponentFixture<PageEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
