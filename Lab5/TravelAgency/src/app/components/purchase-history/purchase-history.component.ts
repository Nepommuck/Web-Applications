import { Component } from '@angular/core';
import { AccountHistoryService } from 'src/app/services/account-history.service';
import { Trip } from 'src/app/Trip';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent {
  showArchival: boolean = false;
  showOngoing: boolean = true;
  showFuture: boolean = true;

  constructor(private _accountHistoryService: AccountHistoryService) {}

  updateFilters(state: number, event: any): void {
    if (state == -1)
      this.showArchival = event.target.checked;
    if (state == 0)
      this.showOngoing = event.target.checked;
    if (state == 1)
      this.showFuture = event.target.checked;
  }
  shouldShow(state: number): boolean {
    if (state == -1)
      return this.showArchival;
    if (state == 0)
    return this.showOngoing;
    if (state == 1)
      return this.showFuture;
    return false;
  }

  getPurchaseHistory(): Record[] {
    const purchaseHistory = this._accountHistoryService.getPurchaseHistory();
    // purchaseHistory.sort(this.recordsCmp);
    purchaseHistory.sort(
      (a, b) => (this.recordsCmp(a, b))
    );
    return purchaseHistory;
  }
  
  fromEu(europeanDate: string): Date {
    const dateParts: string[] = europeanDate.split("/");
    return new Date(+dateParts[2], parseInt(dateParts[1]) - 1, +dateParts[0]); 
  }
  dateCmp(a: Date, b:Date): number {
    if (a < b)
      return -1;
    if (a == b)
      return 0;
    return 1;
  }
  recordsCmp(a: Record, b: Record): number {
    if (a.state - b.state != 0)
      return a.state - b.state;
    const startDiff = this.dateCmp(this.fromEu(a.trip.startDate), this.fromEu(b.trip.startDate));
    if (startDiff != 0)
      return -startDiff;
    const nameDiff = a.trip.name.localeCompare(b.trip.name);
    if (nameDiff != 0)
      return nameDiff;
    return -this.dateCmp(this.fromEu(a.purchaseDate), this.fromEu(b.purchaseDate));
    // const purchaseDiff = this.dateCmp(this.fromEu(a.purchaseDate), this.fromEu(b.purchaseDate));
    // if (purchaseDiff != 0)
    //   return -purchaseDiff;
  }
}

interface Record {trip: Trip, quantity: number, purchaseDate: string, state: number};
