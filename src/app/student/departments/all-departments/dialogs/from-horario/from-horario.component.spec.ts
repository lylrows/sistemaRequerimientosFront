import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromHorarioComponent } from './from-horario.component';

describe('FromHorarioComponent', () => {
  let component: FromHorarioComponent;
  let fixture: ComponentFixture<FromHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromHorarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
