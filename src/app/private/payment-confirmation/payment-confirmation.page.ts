import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {BasicService} from '../../services/basic.service';
import {HttpService} from '../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.page.html',
  styleUrls: ['./payment-confirmation.page.scss'],
})
export class PaymentConfirmationPage implements OnInit {
userDetails: any;
details: any;
wallets: any;
isFunded = false;

  constructor(private storage: Storage, private basicService: BasicService, private httpService: HttpService,
    private router: Router) {
    this.details = this.basicService.getter();
   }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      console.log(val);
      this.userDetails = val;
      this.basicService.loader();
      this.GetWalletDetails(val.customerId).then(() => {
      this.UpdateWallet();
      this.basicService.loading.dismiss();
    });
    });
  }

  UpdateWallet() {
    const model = {
      'walletNumber': this.wallets[0].walletNumber,
      'amount': this.details.Amount
    };
    this.httpService.Put('wallets/fund', model).subscribe((res) => {
      if (res.statusCode === '00') {
        this.isFunded = true;
      }
    });
  }

  GetWalletDetails(customerid) {
    return new Promise ((resolve, reject) => {
      this.httpService.GetAllRecords('wallets/customer/' + customerid).subscribe((res) => {
        console.log(res);
        if (res.statusCode === '00') {
          this.wallets = res.wallets;
          resolve(true);
        }
      });
    });
  }

  Back() {
    this.router.navigateByUrl('/private/dashboard');
  }
}
