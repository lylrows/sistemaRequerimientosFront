import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromReporteIndicadorTwoComponent } from './from-reporte-indicador-two.component';

describe('FromReporteIndicadorTwoComponent', () => {
  let component: FromReporteIndicadorTwoComponent;
  let fixture: ComponentFixture<FromReporteIndicadorTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromReporteIndicadorTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromReporteIndicadorTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
