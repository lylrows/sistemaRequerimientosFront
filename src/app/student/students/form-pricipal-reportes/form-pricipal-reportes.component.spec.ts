import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPricipalReportesComponent } from './form-pricipal-reportes.component';

describe('FormPricipalReportesComponent', () => {
  let component: FormPricipalReportesComponent;
  let fixture: ComponentFixture<FormPricipalReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPricipalReportesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPricipalReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
