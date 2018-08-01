import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAbonnesComponent } from './search-abonnes.component';

describe('SearchAbonnesComponent', () => {
  let component: SearchAbonnesComponent;
  let fixture: ComponentFixture<SearchAbonnesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAbonnesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAbonnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
