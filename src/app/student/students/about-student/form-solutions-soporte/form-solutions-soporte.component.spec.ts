import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSolutionsSoporteComponent } from './form-solutions-soporte.component';

describe('FormSolutionsSoporteComponent', () => {
  let component: FormSolutionsSoporteComponent;
  let fixture: ComponentFixture<FormSolutionsSoporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSolutionsSoporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSolutionsSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
