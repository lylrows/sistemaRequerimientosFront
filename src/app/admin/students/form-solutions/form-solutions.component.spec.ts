import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSolutionsComponent } from './form-solutions.component';

describe('FormSolutionsComponent', () => {
  let component: FormSolutionsComponent;
  let fixture: ComponentFixture<FormSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSolutionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
