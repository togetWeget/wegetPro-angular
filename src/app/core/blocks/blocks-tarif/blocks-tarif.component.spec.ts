import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocksTarifComponent } from './blocks-tarif.component';

describe('BlocksTarifComponent', () => {
  let component: BlocksTarifComponent;
  let fixture: ComponentFixture<BlocksTarifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocksTarifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksTarifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
