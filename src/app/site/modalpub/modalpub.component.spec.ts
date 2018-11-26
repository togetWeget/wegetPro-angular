import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpubComponent } from './modalpub.component';

describe('ModalpubComponent', () => {
  let component: ModalpubComponent;
  let fixture: ComponentFixture<ModalpubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalpubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalpubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
