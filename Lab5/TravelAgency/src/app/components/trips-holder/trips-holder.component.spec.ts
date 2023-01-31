import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsHolderComponent } from './trips-holder.component';

describe('TripsHolderComponent', () => {
  let component: TripsHolderComponent;
  let fixture: ComponentFixture<TripsHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripsHolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripsHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
