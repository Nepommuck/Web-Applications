import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TripsHolderComponent } from './components/trips-holder/trips-holder.component';
import { HomeComponent } from './components/home/home.component';
import { NewTripFormComponent } from './components/new-trip-form/new-trip-form.component';
import { CartComponent } from './components/cart/cart.component';
import { SingleTripPageComponent } from './components/single-trip-page/single-trip-page.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'trips', component: TripsHolderComponent},
  {path: 'new-trip', component: NewTripFormComponent},
  {path: 'cart', component: CartComponent},
  {path: 'purchase-history', component: PurchaseHistoryComponent},
  {path: 'trip/:id', component: SingleTripPageComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
