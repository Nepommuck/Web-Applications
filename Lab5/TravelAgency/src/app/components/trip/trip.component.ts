import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CurrentTripsService } from '../../services/current-trips.service';
import { Trip } from 'src/app/Trip';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})

export class TripComponent implements OnInit {
  @Input()
  trip!: Trip;

  @Input()
  lastTicketsCutOffPoint: number = 3;

  ticketsLeft!: number;
  ticketsSelectedMessage: string = "";
  ticketsLeftMessage: string = "";
  
  constructor(private _currentTripsService: CurrentTripsService, 
    private _cartService: CartService) {}
  
  ngOnInit(): void {
    this.ticketsLeft = this.trip.slots - this._cartService.getNumberOfSelectedTickets(this.trip);
    this.updateMessages(this._cartService.getNumberOfSelectedTickets(this.trip));
    
    // let now = new Date();
    // console.log(now);
    // console.log(now.toLocaleString());
  }
  
  updateTickets(ticketsSelected: number): void {
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

  updateMessages(selectedTickets: number): void {
    this.ticketsSelectedMessage = (selectedTickets > 0) ? "Selected: " + selectedTickets : "";
    this.ticketsLeftMessage = (this.ticketsLeft <= 0) ? "No tickets left" : "Tickets left: " + this.ticketsLeft;
  }

  deleteTrip(): void {
    for (let i=0; i<this.trip.slots - this.ticketsLeft; i++)
      this._cartService.removeItemFromCart(this.trip);

    if (this.ticketsLeft > 0)
      this._currentTripsService.removePrice(this.trip.price);

    this._currentTripsService.removeTrip(this.trip);
  }

  getMinPrice(): number {
    return Math.min(...this._currentTripsService.tripPrices);
  }
  getMaxPrice(): number {
    return Math.max(...this._currentTripsService.tripPrices);
  }
}
