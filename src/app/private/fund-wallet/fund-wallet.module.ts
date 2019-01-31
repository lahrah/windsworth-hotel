import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Angular4PaystackModule } from 'angular4-paystack';

import { IonicModule } from '@ionic/angular';

import { FundWalletPage } from './fund-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: FundWalletPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Angular4PaystackModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FundWalletPage]
})
export class FundWalletPageModule {}
