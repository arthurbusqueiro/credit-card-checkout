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
      creditCardNumber: new FormControl(null, [Validators.required, Validators.minLength(12)]),
      cardHolder: new FormControl(null, Validators.required),
      expirationDate: new FormControl(null, [Validators.required, this.isValidDate]),
      securityCode: new FormControl(null, [Validators.minLength(3), Validators.maxLength(3)]),
      amount: new FormControl(null, [Validators.required, Validators.min(1)])
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
    if (!moment(control.value, 'YYYY-MM-DD').isAfter(moment())) {
      return { expirationDate: 'The card has expired' };
    }
  }
}
