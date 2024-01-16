import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSistemasComponent } from './form-sistemas.component';

describe('FormSistemasComponent', () => {
  let component: FormSistemasComponent;
  let fixture: ComponentFixture<FormSistemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSistemasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
