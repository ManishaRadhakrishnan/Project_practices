import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSubComponent } from './topic-sub.component';

describe('TopicSubComponent', () => {
  let component: TopicSubComponent;
  let fixture: ComponentFixture<TopicSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
