import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogHorasComponent } from './form-dialog-horas.component';

describe('FormDialogHorasComponent', () => {
  let component: FormDialogHorasComponent;
  let fixture: ComponentFixture<FormDialogHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogHorasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDialogHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
