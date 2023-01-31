import { Injectable } from '@angular/core';
import { Trip } from '../Trip';

@Injectable({
  providedIn: 'root'
})
export class AccountHistoryService {
  purchaseHistory: Record[] = [];
  nextTripInDays: number = -1;

  constructor() { }

  addToHistory(cart: {trip: Trip, quantity: number}[]): void {
    for (const item of cart) {
      let newRecord: Record = {
        trip: item.trip,
        quantity: item.quantity,
        purchaseDate: new Date().toLocaleString()
      };
      console.log(newRecord);
      this.purchaseHistory.push(newRecord);
    }
  }
  getPurchaseHistory(): RecordWithState[] {
    let currentPurchaseHistory = [];
    let firstFutureTrip = null;

    for (const item of this.purchaseHistory) {
      let newItem: RecordWithState = {
        trip: item.trip,
        quantity: item.quantity,
        purchaseDate: item.purchaseDate,
        state: 0
      }
      let now = new Date();

      // console.log(now);
      // console.log(new Date(newItem.trip.startDate));
      // console.log(new Date(newItem.trip.endDate));
      const startDate: Date = this.dateFromEuropeanFormat(newItem.trip.startDate);
      const endDate: Date = this.dateFromEuropeanFormat(newItem.trip.endDate);

      // Future
      if (now < startDate)
        newItem.state = 1;
      // Past
      else if (now > endDate)
        newItem.state = -1;
      // Ongoing
      else 
        newItem.state = 0;
      
      currentPurchaseHistory.push(newItem);
      if (newItem.state == 1 && (firstFutureTrip == null || 
        this.dateFromEuropeanFormat(newItem.trip.startDate) < this.dateFromEuropeanFormat(firstFutureTrip.startDate)))
        firstFutureTrip = newItem.trip;
      this.nextTripInDays = (firstFutureTrip == null) ? -1 : this.getDayDiff(new Date(), this.dateFromEuropeanFormat(firstFutureTrip.startDate));
    }
    return currentPurchaseHistory;
  }

  dateFromEuropeanFormat(europeanDate: string): Date {
    const dateParts: string[] = europeanDate.split("/");
    return new Date(+dateParts[2], parseInt(dateParts[1]) - 1, +dateParts[0]); 
  }
  getDayDiff(startDate: Date, endDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;
  
    return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay);
  }
}

interface Record {trip: Trip, quantity: number, purchaseDate: string};
interface RecordWithState {trip: Trip, quantity: number, purchaseDate: string, state: number};
