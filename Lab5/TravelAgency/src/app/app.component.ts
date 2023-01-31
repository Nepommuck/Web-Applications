import { Component } from '@angular/core';
import { AccountHistoryService } from './services/account-history.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zest4-zad7';

  formOpen: boolean = false;

  constructor(private _cartService: CartService, private _accountHistoryService: AccountHistoryService) {};

  openForm(): void {
    this.formOpen = true;
  }
  closeForm(): void {
    this.formOpen = false;
  }

  countItemsInCart(): number {
    return this._cartService.getTotalNumerOfItems();
  }
  getTotalValueOfCart(): number {
    return this._cartService.getTotalCartValue();
  }

  getDaysToNextTrip(): number {
    return this._accountHistoryService.nextTripInDays;
  }
}
