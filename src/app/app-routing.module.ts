import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicineListingComponent } from './pages-components/medicine-listing/medicine-listing.component'

const routes: Routes = [
  {
    path : '',
    component : MedicineListingComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
