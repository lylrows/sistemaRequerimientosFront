import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImagenDetailComponent } from './form-imagen-detail.component';

describe('FormImagenDetailComponent', () => {
  let component: FormImagenDetailComponent;
  let fixture: ComponentFixture<FormImagenDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormImagenDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormImagenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
