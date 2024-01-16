import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogPerfilesComponent } from './form-dialog-perfiles.component';

describe('FormDialogPerfilesComponent', () => {
  let component: FormDialogPerfilesComponent;
  let fixture: ComponentFixture<FormDialogPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogPerfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDialogPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
