import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChildDataComponent } from './add-child-data.component';

describe('AddChildDataComponent', () => {
  let component: AddChildDataComponent;
  let fixture: ComponentFixture<AddChildDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChildDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChildDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
