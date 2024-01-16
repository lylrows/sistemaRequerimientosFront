import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogConstantesComponent } from './form-dialog-constantes.component';

describe('FormDialogConstantesComponent', () => {
  let component: FormDialogConstantesComponent;
  let fixture: ComponentFixture<FormDialogConstantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogConstantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDialogConstantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
