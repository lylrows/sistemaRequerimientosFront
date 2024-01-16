import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArchivoComponent } from './add-archivo.component';

describe('AddArchivoComponent', () => {
  let component: AddArchivoComponent;
  let fixture: ComponentFixture<AddArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArchivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
