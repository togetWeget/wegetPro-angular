import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCliComponent } from './chat-cli.component';

describe('ChatCliComponent', () => {
  let component: ChatCliComponent;
  let fixture: ComponentFixture<ChatCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
