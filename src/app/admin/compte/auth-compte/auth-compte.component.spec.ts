import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCompteComponent } from './auth-compte.component';

describe('AuthCompteComponent', () => {
  let component: AuthCompteComponent;
  let fixture: ComponentFixture<AuthCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
