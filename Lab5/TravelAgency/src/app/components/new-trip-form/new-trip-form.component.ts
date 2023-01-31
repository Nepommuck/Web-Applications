import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Trip } from '../../Trip';
import { CommonModule } from '@angular/common';
import { CurrentTripsService } from '../../services/current-trips.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-trip-form',
  templateUrl: './new-trip-form.component.html',
  styleUrls: ['./new-trip-form.component.css'],

  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ]
})
export class NewTripFormComponent {
  @ViewChild('myForm') form!: NgForm;

  @Output()
  tripAdded = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();

  datesInvalid: boolean = false;

  constructor(private _currentTripsService: CurrentTripsService, private _router: Router) {}

  onSubmit(): void {
    const startDate = new Date(this.form.value['start-date']);
    const endDate = new Date(this.form.value['end-date']);
    this.datesInvalid = (startDate > endDate);

    if (!this.form.valid || this.datesInvalid) {
      this.form.controls['trip-name'].markAsTouched();
      this.form.controls['country'].markAsTouched();
      this.form.controls['start-date'].markAsTouched();
      this.form.controls['end-date'].markAsTouched();
      this.form.controls['price'].markAsTouched();
      this.form.controls['tickets'].markAsTouched();
      return;
    }

    let newTrip: Trip = {
      id: -1,
      name: this.form.value['trip-name'],
      country: this.form.value['country'],
      startDate: startDate.toLocaleDateString('en-GB'),
      endDate: endDate.toLocaleDateString('en-GB'),
      price: this.form.value['price'],
      slots: Math.floor(this.form.value['tickets']),
      description: this.form.value['description'],
      imageSources: ["../../assets/images/trip-images/placeholder.jpg"],
      ratings: {"summary": 0, "numberOfRatings": 0},
      reviews: []
    }
    // this.tripAdded.emit(newTrip);
    this._currentTripsService.addTrip(newTrip);
    this.onClose();

    this.form.reset();
    this._router.navigateByUrl('/trips');
    }

  onClose(): void {
    this.formClosed.emit();
  }
};
