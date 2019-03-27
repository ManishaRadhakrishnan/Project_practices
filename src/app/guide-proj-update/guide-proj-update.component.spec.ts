import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideProjUpdateComponent } from './guide-proj-update.component';

describe('GuideProjUpdateComponent', () => {
  let component: GuideProjUpdateComponent;
  let fixture: ComponentFixture<GuideProjUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideProjUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideProjUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
