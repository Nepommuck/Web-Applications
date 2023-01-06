import { Component, Input } from '@angular/core';
import { Trip } from 'src/app/Trip';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input()
  cart: {trip: Trip, quantity: number}[] = [];

  detailsVisible: boolean = false;

  countItems(): number {
    let result: number = 0;
    for (const record of this.cart) {
      result += record.quantity;
    }
    return result;
  }

  countTotalCost(): number {
    let result: number = 0;
    for (const record of this.cart) {
      result += record.quantity * record.trip.price;
    }
    return result;
  }

  flipVisibility(): void {
    this.detailsVisible = !this.detailsVisible;
  }
}
