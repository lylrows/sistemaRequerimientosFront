import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromANSComponent } from './from-ans.component';

describe('FromANSComponent', () => {
  let component: FromANSComponent;
  let fixture: ComponentFixture<FromANSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromANSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromANSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
