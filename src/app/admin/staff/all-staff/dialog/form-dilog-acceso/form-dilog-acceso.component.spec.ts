import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDilogAccesoComponent } from './form-dilog-acceso.component';

describe('FormDilogAccesoComponent', () => {
  let component: FormDilogAccesoComponent;
  let fixture: ComponentFixture<FormDilogAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDilogAccesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDilogAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
