import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudEditComponent } from './stud-edit.component';

describe('StudEditComponent', () => {
  let component: StudEditComponent;
  let fixture: ComponentFixture<StudEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
