import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { Trip } from 'src/app/Trip';

@Component({
  selector: 'app-trips-holder',
  templateUrl: './trips-holder.component.html',
  styleUrls: ['./trips-holder.component.css']
})
export class TripsHolderComponent {
  @Input()
  trips!: Trip[];

  @Output()
  tripRemoved = new EventEmitter;
  @Output()
  cartChanged = new EventEmitter;

  currentPrices: number[] = [];

  deleteTrip(trip: Trip): void {
    this.tripRemoved.emit(trip);
  }

  updateCart(difference: {trip: Trip, added: number}): void {
    this.cartChanged.emit(difference);
  }
}
