import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutProfilComponent } from './layout-profil.component';

describe('LayoutProfilComponent', () => {
  let component: LayoutProfilComponent;
  let fixture: ComponentFixture<LayoutProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
