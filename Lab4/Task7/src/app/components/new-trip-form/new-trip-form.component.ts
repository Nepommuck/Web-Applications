import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Trip } from '../../Trip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-trip-form',
  templateUrl: './new-trip-form.component.html',
  styleUrls: ['./new-trip-form.component.css'],

  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class NewTripFormComponent {
  @ViewChild('myForm') form!: NgForm;

  @Output()
  tripAdded = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.controls['trip-name'].markAsTouched();
      this.form.controls['country'].markAsTouched();
      this.form.controls['start-date'].markAsTouched();
      this.form.controls['end-date'].markAsTouched();
      this.form.controls['price'].markAsTouched();
      this.form.controls['tickets'].markAsTouched();
      return;
    }

    let newTrip: Trip = {
      name: this.form.value['trip-name'],
      country: this.form.value['country'],
      startDate: this.form.value['start-date'],
      endDate: this.form.value['end-date'],
      price: this.form.value['price'],
      slots: Math.floor(this.form.value['tickets']),
      description: this.form.value['description'],
      imageSource: "../../assets/images/trip-images/placeholder.jpg",
      ratings: {"summary": 0, "numberOfRatings": 0}
    }
    this.tripAdded.emit(newTrip);
    this.onClose();

    this.form.reset();
    }

  onClose(): void {
    this.formClosed.emit();
  }
};
