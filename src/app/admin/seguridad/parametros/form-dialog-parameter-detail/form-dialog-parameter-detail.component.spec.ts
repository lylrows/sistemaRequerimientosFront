import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogParameterDetailComponent } from './form-dialog-parameter-detail.component';

describe('FormDialogParameterDetailComponent', () => {
  let component: FormDialogParameterDetailComponent;
  let fixture: ComponentFixture<FormDialogParameterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogParameterDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDialogParameterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
