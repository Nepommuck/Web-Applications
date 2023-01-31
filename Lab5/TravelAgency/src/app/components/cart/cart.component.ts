import { Component, Input } from '@angular/core';
import { AccountHistoryService } from 'src/app/services/account-history.service';
import { CartService } from 'src/app/services/cart.service';
import { Trip } from 'src/app/Trip';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private _cartService: CartService, private _accountHistoryService: AccountHistoryService) {}

  countTotalCost(): number {
    return this._cartService.getTotalCartValue();
  }

  getCart(): {trip: Trip, quantity: number}[] {
    return this._cartService.cart;
  }

  purchase(): void {
    this._cartService.moveToPurchaseHistory();
    this._cartService.clearCart();
  }
}
