import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CurrentTripsService } from '../../services/current-trips.service';
import { Trip } from '../../Trip';

@Component({
  selector: 'app-single-trip-page',
  templateUrl: './single-trip-page.component.html',
  styleUrls: ['./single-trip-page.component.css']
})
export class SingleTripPageComponent implements OnInit {
  trip!: Trip | undefined;

  ticketsLeft!: number;
  ticketsSelectedMessage: string = "";
  ticketsLeftMessage: string = "";

  refreshNeeded: boolean = false;

  imageObject: Array<object> = [];

  constructor(private _currentTripsService: CurrentTripsService, private route: ActivatedRoute,
    private _cartService: CartService) {}

  ngOnInit() {
    let id: number = -1;
    this.route.queryParams.subscribe(
      params => {
        id = params['id'];
      }
    );
    console.log(id);

    this.trip = this._currentTripsService.getTripById(id);
    console.log(this.trip);

    if (this.trip != undefined) {
      this.ticketsLeft = this.trip.slots - this._cartService.getNumberOfSelectedTickets(this.trip);
      this.updateMessages(this._cartService.getNumberOfSelectedTickets(this.trip));

      for (const src of this.trip.imageSources)
        this.imageObject.push(
          {
            image: src,
            thumbImage: src
          }
        );
    }
  }

  updateTickets(ticketsSelected: number): void {
    if (this.trip != undefined) {
      if (this.ticketsLeft == 0 && ticketsSelected != 0 && ticketsSelected < this.trip.slots)
        this._currentTripsService.addPrice(this.trip.price);

      let ticketsDifference = ticketsSelected - (this.trip.slots - this.ticketsLeft);

      if (ticketsDifference > 0)
        this._cartService.addItemToCart(this.trip);
      else if (ticketsDifference < 0)
        this._cartService.removeItemFromCart(this.trip);

      this.ticketsLeft = this.trip.slots - ticketsSelected;

      if (this.ticketsLeft == 0 && ticketsSelected > 0)    
        this._currentTripsService.removePrice(this.trip.price);
        // this.removeValue(this.prices, this.trip.price);
      this.updateMessages(ticketsSelected);
    }
  }

  updateMessages(selectedTickets: number): void {
    this.ticketsSelectedMessage = (selectedTickets > 0) ? "Selected: " + selectedTickets : "";
    this.ticketsLeftMessage = (this.ticketsLeft <= 0) ? "No tickets left" : "Tickets left: " + this.ticketsLeft;
  }

  deleteTrip(): void {    
    if (this.trip != undefined) {
      for (let i=0; i<this.trip.slots - this.ticketsLeft; i++)
        this._cartService.removeItemFromCart(this.trip);

      if (this.ticketsLeft > 0)
        this._currentTripsService.removePrice(this.trip.price);

      this._currentTripsService.removeTrip(this.trip);
    }
  }

  // getUserRating(): number {
  //   if (this.trip == undefined)
  //     return -1;
  //   return this._ratingsService.getUserRatingFor(this.trip);
  // }

  async refreshRating() {
    this.refreshNeeded = true;
    await new Promise(f => setTimeout(f, 10));
    this.refreshNeeded = false;
  }
}
