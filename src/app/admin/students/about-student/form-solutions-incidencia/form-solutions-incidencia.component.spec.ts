import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSolutionsIncidenciaComponent } from './form-solutions-incidencia.component';

describe('FormSolutionsIncidenciaComponent', () => {
  let component: FormSolutionsIncidenciaComponent;
  let fixture: ComponentFixture<FormSolutionsIncidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSolutionsIncidenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSolutionsIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
