import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  selectedMethod: string;

  constructor(
    private router: Router
  ) {

  }

  selectMethod(method: string): void {
    this.selectedMethod = method;
    this.router.navigate([method]);
  }
}
