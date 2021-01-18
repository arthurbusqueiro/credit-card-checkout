import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditCardComponent } from './pages/credit-card/credit-card.component';

const routes: Routes = [
  { path: 'credit-card', component: CreditCardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
