import { Injectable } from '@angular/core';
import { Trip } from './../Trip';
import { AccountHistoryService } from './account-history.service';
import { CurrentTripsService } from './current-trips.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cart: {trip: Trip, quantity: number}[] = []; 

  constructor(private _accountHistoryService: AccountHistoryService) { }

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

  getNumberOfSelectedTickets(trip: Trip) {
    for (const record of this.cart) {
      if (record.trip == trip) {
        console.log(record.quantity);
        return record.quantity;
      }
    }
    return 0;
  }

  getTotalNumerOfItems(): number {
    let result = 0;
    for (const record of this.cart)
      result += record.quantity;      
    return result;
  }
  getTotalCartValue(): number {
    let result = 0;
    for (const record of this.cart)
      result += record.quantity * record.trip.price;      
    return result;
  }

  moveToPurchaseHistory(): void {
    // for (const item of this.cart)
    //   this._currentTripsService.removeNTickets(item.trip, item.quantity);
    
    for (const item of this.cart)
      item.trip.slots -= item.quantity;
    this._accountHistoryService.addToHistory(this.cart);
  }

  clearCart(): void {
    this.cart = [];
  }
}
