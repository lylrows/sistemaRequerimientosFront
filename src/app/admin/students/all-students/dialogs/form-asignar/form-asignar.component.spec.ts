import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAsignarComponent } from './form-asignar.component';

describe('FormAsignarComponent', () => {
  let component: FormAsignarComponent;
  let fixture: ComponentFixture<FormAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAsignarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
