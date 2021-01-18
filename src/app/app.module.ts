import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreditCardComponent } from './pages/credit-card/credit-card.component';
import { CreditCardService } from './services/credit-card.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'ngx-card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule  } from 'ngx-spinner';

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
    CardModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule,
    NgxSpinnerModule
  ],
  providers: [
    CreditCardService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
