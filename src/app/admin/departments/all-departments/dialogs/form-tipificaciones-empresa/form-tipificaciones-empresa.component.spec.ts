import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTipificacionesEmpresaComponent } from './form-tipificaciones-empresa.component';

describe('FormTipificacionesEmpresaComponent', () => {
  let component: FormTipificacionesEmpresaComponent;
  let fixture: ComponentFixture<FormTipificacionesEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTipificacionesEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTipificacionesEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
