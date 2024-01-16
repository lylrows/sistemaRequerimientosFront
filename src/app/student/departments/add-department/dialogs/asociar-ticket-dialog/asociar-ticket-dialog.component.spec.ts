import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarTicketDialogComponent } from './asociar-ticket-dialog.component';

describe('AsociarTicketDialogComponent', () => {
  let component: AsociarTicketDialogComponent;
  let fixture: ComponentFixture<AsociarTicketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsociarTicketDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsociarTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
