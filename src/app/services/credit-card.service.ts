import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreditCard } from '../models/credit-card';
import { CreditCardDTO } from '../models/dtos/credit-card.dto';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(
    private httpClient: HttpClient
  ) { }

  checkout(creditCardDTO: CreditCardDTO): Observable<CreditCard> {
    return this.httpClient.post(environment.apiURL + 'credit-card', creditCardDTO)
      .pipe(map((response) => response as CreditCard));
  }
}
