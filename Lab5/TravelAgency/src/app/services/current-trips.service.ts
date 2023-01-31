import { Injectable } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Trip, TripReview } from './../Trip';
import data from './../trips.json';

@Injectable({
  providedIn: 'root'
})
export class CurrentTripsService {

  tripsList: Trip[];
  tripPrices: number[];

  firstFreeID: number = 0;
  selectedTrip!: Trip;

  constructor(private _cartService: CartService) { 
    this.tripsList = data.trips;
    this.tripPrices = [];
    for (const trip of this.tripsList) {
      if (trip.slots > this._cartService.getNumberOfSelectedTickets(trip))
        this.tripPrices.push(trip.price);
      this.firstFreeID = Math.max(this.firstFreeID, trip.id + 1);
    }
  }

  addTrip(trip: Trip): void {
    trip.id = this.firstFreeID;
    this.firstFreeID++;
    this.tripsList.push(trip);
    console.log(trip);
  }

  removeTrip(trip: Trip): void {
    this.tripsList = this.tripsList.filter(
      (value) => value != trip
    );
  }

  addPrice(price: number): void {
    this.tripPrices.push(price);
  }

  removePrice(price: number): boolean {
    let ind: number = this.tripPrices.indexOf(price);
    if (ind < 0)
      return false;
    this.tripPrices.splice(ind, 1);
    return true;
  }

  getTripById(id: number): Trip | undefined {
    for (const trip of this.tripsList)
      if (trip.id == id)
        return trip;
    return undefined;
  }

  addReview(trip: Trip, newReview: TripReview) {
    trip.reviews.push(newReview);
    console.log(this.tripsList);

    trip.ratings.summary += newReview.rating;
    trip.ratings.numberOfRatings++;
  }

  getCurrentRatings(trip: Trip) {
    return trip.ratings;
  }

  removeNTickets(trip: Trip, tickets: number) {
    // for (const givenTrip of this.tripsList) {
    //   if (givenTrip == trip)
    //     givenTrip.
    // }
    trip.slots -= tickets;
  }
}
