import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatdiologComponent } from './matdiolog.component';

describe('MatdiologComponent', () => {
  let component: MatdiologComponent;
  let fixture: ComponentFixture<MatdiologComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatdiologComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatdiologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
