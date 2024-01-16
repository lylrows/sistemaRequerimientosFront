import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNivelSoporteComponent } from './form-nivel-soporte.component';

describe('FormNivelSoporteComponent', () => {
  let component: FormNivelSoporteComponent;
  let fixture: ComponentFixture<FormNivelSoporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNivelSoporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNivelSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
