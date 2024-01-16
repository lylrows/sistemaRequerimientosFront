import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClientePassComponent } from './form-cliente-pass.component';

describe('FormClientePassComponent', () => {
  let component: FormClientePassComponent;
  let fixture: ComponentFixture<FormClientePassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormClientePassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormClientePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
