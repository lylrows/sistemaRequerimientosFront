import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDashboardComponent } from './form-dashboard.component';

describe('FormDashboardComponent', () => {
  let component: FormDashboardComponent;
  let fixture: ComponentFixture<FormDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
