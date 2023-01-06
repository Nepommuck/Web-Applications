import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input()
  prices!: number[];

  ticketsLeft!: number;
  ticketsSelectedMessage: string = "";
  ticketsLeftMessage: string = "";
  
  @Output()
  tripDeleted = new EventEmitter();
  @Output()
  cartChanged = new EventEmitter();

  updateTickets(ticketsSelected: number): void {
    if (this.ticketsLeft == 0 && ticketsSelected < this.trip.slots)
      this.prices.push(this.trip.price);

    let ticketsDifference = ticketsSelected - (this.trip.slots - this.ticketsLeft);
    if (ticketsDifference != 0)
      // Price difference
      this.cartChanged.emit({trip: this.trip, added: ticketsDifference > 0});

    this.ticketsLeft = this.trip.slots - ticketsSelected;

    if (this.ticketsLeft == 0 && ticketsSelected > 0)
      this.removeValue(this.prices, this.trip.price);

    this.ticketsSelectedMessage = (ticketsSelected > 0) ? "Selected: " + ticketsSelected : "";
    this.ticketsLeftMessage = (this.ticketsLeft <= 0) ? "No tickets left" : "Tickets left: " + this.ticketsLeft;
  }

  deleteTrip(): void {
    for (let i=0; i<this.trip.slots - this.ticketsLeft; i++)
      this.cartChanged.emit({trip: this.trip, added: false});
    if (this.ticketsLeft > 0)
      this.removeValue(this.prices, this.trip.price);
    this.tripDeleted.emit(this.trip);
  }
  
  removeValue(arr: any[], val: any) : boolean {
    let ind: number = arr.indexOf(val);
    if (ind < 0)
      return false;
    arr.splice(ind, 1);
    return true;
  }
  min(arr: number[]): number {
    return Math.min(...arr);
  }
  max(arr: number[]): number {
    return Math.max(...arr);
  }
  
  ngOnInit(): void {
    this.ticketsLeft = this.trip.slots;
    if (this.ticketsLeft > 0)
      this.prices.push(this.trip.price);
    this.updateTickets(0);
  }
}
