import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatewiseComponent } from './datewise.component';

describe('DatewiseComponent', () => {
  let component: DatewiseComponent;
  let fixture: ComponentFixture<DatewiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatewiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatewiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
