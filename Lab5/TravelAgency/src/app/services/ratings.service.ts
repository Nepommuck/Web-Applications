import { Injectable } from '@angular/core';
import { Trip } from './../Trip';

@Injectable({
  providedIn: 'root'
})
// LEGACY UNUSED SERVICE
export class RatingsService {

  userRatings: {trip: Trip, userRating: number}[] = []; 
  
  constructor() { 
    this.userRatings = [];
  }

  addRatingFor(trip: Trip, rating: number): void {
    for (const record of this.userRatings) {
      if (record.trip == trip) {
        record.userRating = rating;
        return;
      }
    }
    this.userRatings.push({trip: trip, userRating: rating});
  }

  getUserRatingFor(trip: Trip): number {
    for (const record of this.userRatings) {
      if (record.trip == trip) {
        return record.userRating;
      }
    }
    // No rating given
    return -1;
  }
}
