import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})

export class StarRatingComponent implements OnInit {
  @Input()
  currentRating!: Rating;

  width: number = 0;
  userRating = -1;

  ngOnInit(): void {
    this.updateWidth();
  }

  updateWidth(): void {
    this.width = (this.currentRating.numberOfRatings <= 0) ? 0 : 
    22.5 * this.currentRating.summary / this.currentRating.numberOfRatings;
  }

  onRatingAdded(newRating: number) {
    if (this.userRating > 0) {
      this.currentRating.summary -= this.userRating;
      this.currentRating.numberOfRatings--;  
    }
    this.userRating = newRating;
    this.currentRating.summary += newRating;
    this.currentRating.numberOfRatings++;    

    this.updateWidth();
  }
}

export interface Rating {
  summary: number,
  numberOfRatings: number
}