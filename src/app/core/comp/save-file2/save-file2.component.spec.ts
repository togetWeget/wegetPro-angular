import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFile2Component } from './save-file2.component';

describe('SaveFile2Component', () => {
  let component: SaveFile2Component;
  let fixture: ComponentFixture<SaveFile2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveFile2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFile2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
