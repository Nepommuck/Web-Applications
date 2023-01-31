import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { CurrentTripsService } from '../../services/current-trips.service';
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
  cartChanged = new EventEmitter;

  constructor(private _currentTripsService: CurrentTripsService) {}

  updateCart(difference: {trip: Trip, added: number}): void {
    this.cartChanged.emit(difference);
  }

  getCurrentTrips(): Trip[] {
    return this._currentTripsService.tripsList;
  }
}
