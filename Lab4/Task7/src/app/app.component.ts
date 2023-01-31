import { Component } from '@angular/core';
import { Trip } from './Trip';
import data from './trips.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zest4-zad7';

  tripList: Trip[] = data.trips;
  formOpen: boolean = false;

  cart: {trip: Trip, quantity: number}[] = []; 

  addTrip(newTrip: Trip): void {
    this.tripList.push(newTrip);
  }
  removeTrip(trip: Trip): void {
    this.tripList = this.tripList.filter(
      (val) => (val != trip)
    );
  }

  openForm(): void {
    this.formOpen = true;
  }
  closeForm(): void {
    this.formOpen = false;
  }

  updateCart(difference: {trip: Trip, added: number}): void {
    (difference.added) ? this.addItemToCart(difference.trip) : this.removeItemFromCart(difference.trip);
  }

  addItemToCart(item: Trip): void {
    // Already there
    for (const record of this.cart) {
      if (record.trip == item) {
        record.quantity += 1;
        return;
      }
    }
    // Add new record
    this.cart.push({trip: item, quantity: 1});
    this.cart.sort(
      (a, b) => a.trip.name.toLowerCase().localeCompare(b.trip.name.toLocaleLowerCase())
    );
  }
  removeItemFromCart(item: Trip): void {
    let toDelete = {trip: item, quantity: -1};
    for (const record of this.cart) {
      if (record.trip == item) {
        record.quantity -= 1;
        if (record.quantity > 0)
          return;
        toDelete = record;
        break;
      }
    }
    this.cart.splice(
      this.cart.indexOf(toDelete), 1
    );
  }
}
