import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input()
  message: string = "Click me"
  
  @Output() 
  btnClick = new EventEmitter();

  onClick(): void {
    this.btnClick.emit();
  }
}
