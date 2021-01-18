import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CreditCardDTO } from 'src/app/models/dtos/credit-card.dto';
import { CreditCardService } from 'src/app/services/credit-card.service';
import * as moment from 'moment';
import { FormUtil } from 'src/app/utils/form.util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit, OnDestroy {

  form: FormGroup;
  postSubscription: Subscription;
  constructor(
    private service: CreditCardService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
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
      this.snackBar.open(result, 'OK', { duration: 2000 });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  async postForm(form: CreditCardDTO): Promise<string> {
    return new Promise<string>(
      async (resolve) => {
        this.spinner.show();
        this.postSubscription = this.service.checkout(form).subscribe(
          async (response) => {
            this.spinner.hide();
            console.log(response);
            resolve(`The amount of $${form.amount} was charged from your Credit Card.`);
            resolve('The amount of Credit Card sent succesfully');
          },
          async (err) => {
            this.spinner.hide();
            console.log(err);
            resolve('There was a problema sending the request. Please try again.');
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
    numbers = numbers.map((d, index) => {
      if ((index % 2) === 0) {
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
    if (((total + last) % 10) !== 0) {
      return {
        invalid: 'The Credit Card Number is invalid'
      };
    }
  }

}
