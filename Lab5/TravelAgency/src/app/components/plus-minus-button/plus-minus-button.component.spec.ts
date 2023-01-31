import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusMinusButtonComponent } from './plus-minus-button.component';

describe('PlusMinusButtonComponent', () => {
  let component: PlusMinusButtonComponent;
  let fixture: ComponentFixture<PlusMinusButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlusMinusButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlusMinusButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
