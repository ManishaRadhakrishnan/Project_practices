import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudProfComponent } from './stud-prof.component';

describe('StudProfComponent', () => {
  let component: StudProfComponent;
  let fixture: ComponentFixture<StudProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
