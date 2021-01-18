import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditCardDTO } from 'src/app/models/dtos/credit-card.dto';
import { CreditCardService } from 'src/app/services/credit-card.service';
import * as moment from 'moment';
import { FormUtil } from 'src/app/utils/form.util';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit, OnDestroy {

  form: FormGroup;
  postSubscription: Subscription;
  constructor(
    private service: CreditCardService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      creditCardNumber: new FormControl(null, [Validators.required, this.isValidCard]),
      cardHolder: new FormControl(null, Validators.required),
      expirationDate: new FormControl(null, [Validators.required, this.isValidDate]),
      securityCode: new FormControl(null, [Validators.minLength(3), Validators.maxLength(3)]),
      amount: new FormControl(FormUtil.generateRandomValue(100, 2000), [Validators.required, Validators.min(1)])
    });
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  async submit(): Promise<void> {
    FormUtil.validateAndTouchForm(this.form);
    if (this.form.valid) {
      const result = await this.postForm(this.form.value);
    }
  }

  async postForm(form: CreditCardDTO): Promise<string> {
    return new Promise<string>(
      async (resolve) => {
        this.postSubscription = this.service.checkout(form).subscribe(
          async (response) => {
            console.log(response);
            resolve('Formulário enviado com sucesso');
          },
          async (err) => {
            console.log(err);
            resolve('Formulário');
          }
        );
      }
    );
  }

  isValidDate(control: AbstractControl): any {
    if (!control.value) {
      return;
    }
    if (!moment(control.value.replace(/\s/g, ''), 'MM/YYYY').isAfter(moment())) {
      return { invalid: 'The card has expired' };
    }
  }

  isValidCard(control: AbstractControl): ValidationErrors {
    if (!control.value) {
      return;
    }
    const copy = { ...control };
    let numbers = copy.value.replace(/\s/g, '').split('').map((d) => Number.parseInt(d, 10));

    // Drop the last digit:
    const last = numbers.pop();

    // Reverse the digits:
    numbers = numbers.reverse();

    // Multiple odd digits by 2
    numbers = numbers.map((d) => {
      if ((d % 2) !== 0) {
        d *= 2;
      }
      return d;
    });

    // Subtract 9 to numbers over 9
    numbers = numbers.map((d) => {
      if (d > 9) {
        d -= 9;
      }
      return d;
    });

    // Add all numbers
    const total = numbers.reduce((sum, val) => {
      sum += val;
      return sum;
    }, 0);

    // Mod 10
    if (last !== Number.parseInt((total / 10).toFixed(0), 10)) {
      return {
        invalid: 'The Credit Card Number is invalid'
      };
    }
  }

}
