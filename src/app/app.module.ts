import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreditCardComponent } from './pages/credit-card/credit-card.component';
import { CreditCardService } from './services/credit-card.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'ngx-card';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CardModule
  ],
  providers: [
    CreditCardService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
