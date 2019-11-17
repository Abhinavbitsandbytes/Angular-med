import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MedicineListingComponent } from './pages-components/medicine-listing/medicine-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule,MatInputModule,MatSelectModule, MatDialogModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    MedicineListingComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,MatInputModule,MatSelectModule, MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
