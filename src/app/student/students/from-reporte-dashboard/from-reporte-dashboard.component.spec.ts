import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromReporteDashboardComponent } from './from-reporte-dashboard.component';

describe('FromReporteDashboardComponent', () => {
  let component: FromReporteDashboardComponent;
  let fixture: ComponentFixture<FromReporteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromReporteDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromReporteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
