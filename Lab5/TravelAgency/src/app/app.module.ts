import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgImageSliderModule } from 'ng-image-slider';

import { AppComponent } from './app.component';
import { TripComponent } from './components/trip/trip.component';
import { TripsHolderComponent } from './components/trips-holder/trips-holder.component';
import { PlusMinusButtonComponent } from './components/plus-minus-button/plus-minus-button.component';
import { NewTripFormComponent } from './components/new-trip-form/new-trip-form.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { CartComponent } from './components/cart/cart.component';
import { CurrentTripsService } from './services/current-trips.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SingleTripPageComponent } from './components/single-trip-page/single-trip-page.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';
import { FormsModule } from '@angular/forms';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';

@NgModule({
  declarations: [
    AppComponent,
    TripComponent,
    TripsHolderComponent,
    PlusMinusButtonComponent,
    StarRatingComponent,
    CartComponent,
    HomeComponent,
    SingleTripPageComponent,
    CommentSectionComponent,
    PurchaseHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NewTripFormComponent,
    AppRoutingModule,
    NgImageSliderModule
  ],
  providers: [
    CurrentTripsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
