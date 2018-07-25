import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocksAfficheComponent } from './blocks-affiche.component';

describe('BlocksAfficheComponent', () => {
  let component: BlocksAfficheComponent;
  let fixture: ComponentFixture<BlocksAfficheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocksAfficheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksAfficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
