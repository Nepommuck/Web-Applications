import { EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-plus-minus-button',
  templateUrl: './plus-minus-button.component.html',
  styleUrls: ['./plus-minus-button.component.css']
})
export class PlusMinusButtonComponent {
  ticketsSelected: number = 0;

  @Input()
  maxTickets!: number;
  
  @Output()
  valueChanged = new EventEmitter();
  
  add(difference: number): void {
    let newTicketsSelected: number = this.ticketsSelected + difference;
    if (newTicketsSelected < 0 || newTicketsSelected > this.maxTickets)
      return;

    this.ticketsSelected = newTicketsSelected;
    this.valueChanged.emit(this.ticketsSelected);
  }
}
