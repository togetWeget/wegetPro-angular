import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilAvatarComponent } from './profil-avatar.component';

describe('ProfilAvatarComponent', () => {
  let component: ProfilAvatarComponent;
  let fixture: ComponentFixture<ProfilAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
