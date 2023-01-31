import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CurrentTripsService } from '../../services/current-trips.service';
import { Trip, TripReview } from 'src/app/Trip';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent {
  @Input()
  trip!: Trip;
  @Input()
  rating!: number;

  @Output()
  reviewAdded = new EventEmitter();

  @ViewChild('myForm') form!: NgForm;

  constructor(private _currentTripsService: CurrentTripsService) {}

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.controls['nick'].markAsTouched();
      this.form.controls['description'].markAsTouched();
      return;
    }
    
    let newReview: TripReview = {
      author: this.form.value['nick'],
      rating: this.rating,
      comment: this.form.value['description']
    }
    let date = this.form.value['date'];
    if (date != null && date != "")
      newReview.date = date;
      
    this._currentTripsService.addReview(this.trip, newReview);
    this.reviewAdded.emit();

    this.form.reset();
  }

  updateRating(newRating: number): void {
    this.rating = newRating;
  }
}
