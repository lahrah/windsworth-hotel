import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'fund-wallet', loadChildren: './fund-wallet/fund-wallet.module#FundWalletPageModule' },
  { path: 'payment-confirmation', loadChildren: './payment-confirmation/payment-confirmation.module#PaymentConfirmationPageModule' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
