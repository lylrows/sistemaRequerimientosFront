import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouWallComponent } from './thank-you-wall.component';

describe('ThankYouWallComponent', () => {
  let component: ThankYouWallComponent;
  let fixture: ComponentFixture<ThankYouWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankYouWallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThankYouWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
