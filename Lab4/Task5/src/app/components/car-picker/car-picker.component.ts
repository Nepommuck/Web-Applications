import { Component, Input, OnInit } from '@angular/core';
import { Car, Brand } from '../../Car';
import data from '../../carList.json';

@Component({
  selector: 'app-car-picker',
  templateUrl: './car-picker.component.html',
  styleUrls: ['./car-picker.component.css']
})
export class CarPickerComponent implements OnInit {


  carList: Car[] = data.cars;
  testArr = [1, 2, 3, 4];

  brands: Brand[] = [];
  models = {};

  savedBrands: string[] = [];
  selectedBrandInd = -1;
  selectedModelInd = -1;
  selectedColor: string = "";

  ngOnInit(): void {
    for (const car of this.carList) {      
      let brandName: string = this.capitalize(car.brand);

      if (!this.savedBrands.includes(brandName)) {
        this.savedBrands.push(brandName);
        this.brands.push({ name: brandName, models: [] })
      }

      this.brands[this.savedBrands.indexOf(brandName)].models.push(this.capitalize(car.model));
    }
  }

  onBrandSelected(value: string): void {
		this.selectedBrandInd = this.savedBrands.indexOf(value);
    this.onModelSelected("");
	}

  onModelSelected(value: string): void {
    this.selectedModelInd = -1;
    if (this.selectedBrandInd >= 0)
		  this.selectedModelInd = this.brands[this.selectedBrandInd].models.indexOf(value);
    else
      this.selectedModelInd = -1;
    this.onColorSelected("");
	}

  onColorSelected(value: string): void {
    if (this.selectedModelInd >= 0)
		  this.selectedColor = value;
    else
      this.selectedColor = "";
    this.console.log(this.selectedColor)
  }

  getResultMessage() {
    return "Congratulations! Your Choice: " + this.brands[this.selectedBrandInd].name + " " 
    + this.brands[this.selectedBrandInd].models[this.selectedModelInd] + " " + this.capitalize(this.selectedColor);
  }

  capitalize(str: string) {
    if (str.length < 1)
      return "";
    let result = "";
    let space = true;
    for (const char of str) {
      if (space)
        result = result + char.toUpperCase();
      else
        result = result + char;

      space = (char == ' ');
    }
    // return str.charAt(0).toUpperCase() + str.substring(1).toLocaleLowerCase();
    return result;
  }

  console = console;
}
