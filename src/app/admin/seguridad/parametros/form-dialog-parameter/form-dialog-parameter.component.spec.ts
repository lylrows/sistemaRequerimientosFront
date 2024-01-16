import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogParameterComponent } from './form-dialog-parameter.component';

describe('FormDialogParameterComponent', () => {
  let component: FormDialogParameterComponent;
  let fixture: ComponentFixture<FormDialogParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogParameterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDialogParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
