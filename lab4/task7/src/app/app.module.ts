import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TripComponent } from './components/trip/trip.component';
import { TripsHolderComponent } from './components/trips-holder/trips-holder.component';
import { PlusMinusButtonComponent } from './components/plus-minus-button/plus-minus-button.component';
import { NewTripFormComponent } from './components/new-trip-form/new-trip-form.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    TripComponent,
    TripsHolderComponent,
    PlusMinusButtonComponent,
    StarRatingComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,

    NewTripFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
