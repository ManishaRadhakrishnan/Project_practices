import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionViewComponent } from './suggestion-view.component';

describe('SuggestionViewComponent', () => {
  let component: SuggestionViewComponent;
  let fixture: ComponentFixture<SuggestionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
