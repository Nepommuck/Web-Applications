import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentTripsService } from '../../services/current-trips.service';
import { RatingsService } from 'src/app/services/ratings.service';
import { Trip } from 'src/app/Trip';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})

export class StarRatingComponent implements OnInit {
  @Input()
  trip!: Trip;

  @Input()
  writeonly: boolean = false;
  @Input()
  readonly: boolean = false;
  @Input()
  horizontal: boolean = false;
  @Input()
  ratingToDisplay: number = 3;

  @Output()
  ratingChosen = new EventEmitter();

  currentRating!: Rating;
  width: number = 0;

  constructor(private _ratingsService: RatingsService, private _currentTripsService: CurrentTripsService) {};

  ngOnInit(): void {
    if (this.writeonly) {
      this.currentRating = {"summary": this.ratingToDisplay, "numberOfRatings": 1};
    }
    // else if (this.activeReader) {
    //   this.currentRating = this._currentTripsService.getCurrentRatings(this.trip);
    // }
    else {
      this.currentRating = this.trip.ratings;

      if (this.getUserRating() >= 0) {
        this.currentRating.summary += this.getUserRating();
        this.currentRating.numberOfRatings++;  
      }
    }
    this.updateWidth();
  }

  ngOnChanges() {
    console.log("e");
    if (!this.writeonly) {
      this.currentRating = this.trip.ratings;
      this.updateWidth();
    }
  }

  updateWidth(): void {
    this.width = (this.currentRating.numberOfRatings <= 0) ? 0 : 
    22.5 * this.currentRating.summary / this.currentRating.numberOfRatings;
  }

  onRatingAdded(newRating: number) {
    if (this.writeonly) {
      this.currentRating.summary = newRating;
      this.currentRating.numberOfRatings = 1;
      this.updateWidth();
      this.ratingChosen.emit(newRating);
      return;
    }

    let userRating = this.getUserRating();
    if (userRating > 0) {
      this.currentRating.summary -= userRating;
      this.currentRating.numberOfRatings--;  
    }
    this._ratingsService.addRatingFor(this.trip, newRating);
    this.currentRating.summary += newRating;
    this.currentRating.numberOfRatings++;    

    this.updateWidth();
  }

  getUserRating(): number {
    return this._ratingsService.getUserRatingFor(this.trip);
  }
}

export interface Rating {
  summary: number,
  numberOfRatings: number
}