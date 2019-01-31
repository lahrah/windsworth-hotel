import { Component, OnInit } from '@angular/core';
import {BasicService} from '../../services/basic.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fund-wallet',
  templateUrl: './fund-wallet.page.html',
  styleUrls: ['./fund-wallet.page.scss'],
})

export class FundWalletPage implements OnInit {
amount: string;
showconfirm = false;
total: number;
fee: number;
userDetails: any;
paystackAmt: number;
// PayStackOptions: PayStackOptions;
response: any;
ref: string;
publickey = 'pk_test_29e07e4025b42a437427fc2abd048e576a2b9b1a';
// PaystackPop = {
//   setup: (options: PayStackOptions) => {
//     return this.response;
//   }
// };

  constructor(private basicService: BasicService, private storage: Storage, private router: Router) {
    this.storage.get('user').then((val) => {
      console.log(val);
      this.userDetails = val;
      // this.Initialize();
    });
  }

  ngOnInit() {
  }

  ShowConfirmation() {
    console.log(this.amount);
    if (!this.amount) {
      this.basicService.presentAlert('', 'Enter amount to be debited.', 'OK');
      return;
    }
    const random = Math.floor(Math.random() * (99999999 - 10000000)) + 10000000;
      this.ref = 'WH' + random;
      this.fee = ((1.9 / 100) * Number(this.amount)) + 100.00;
      this.total = Math.round(this.fee + Number(this.amount));
      // for paystack test, multiply by 100
      this.paystackAmt = this.total * 100;
      console.log(this.total);
      this.showconfirm = true;
  }

  ChangeAmount() {
    this.showconfirm = false;
  }
  // Initialize() {
  //   this.PayStackOptions = {
  //     key: 'pk_test_29e07e4025b42a437427fc2abd048e576a2b9b1a' ,
  //     email: this.userDetails.email ,
  //     amount: this.total ,
  //     metadata: {
  //       custom_fields : {
  //         display_name : 'Mobile Number',
  //         variable_name: 'Mobile Number',
  //         value: this.userDetails.phone
  //       }
  //     },
  //     currency: 'NGN' ,
  //     callback: (res) => {
  //       // this.isPaying = false;
  //       // this.callback.emit(res);
  //     },
  //     onClose: () => {
  //       // this.isPaying = false;
  //       // this.close.emit();
  //     }
  //   };
  // }

  // PayWithPaystack() {
  //   this.Initialize();
  //   // get the script
  //   get('https://js.paystack.co/v1/inline.js', () => {
  //     const handler = this.PaystackPop.setup(this.PayStackOptions);
  //     console.log(handler);
  //     handler.openIframe();
  // });
  //  this.httpService.GetExternal('https://js.paystack.co/v1/inline.js').subscribe((res) => {
  //   const script = res;
  //   console.log(script);

  //  });
    //  console.log(this.PayStackOptions);
    //   const handler = this.PaystackPop.setup(this.PayStackOptions);
    //   console.log(handler);
    //   handler.openIframe();
    // const handler = this.PaystackPop.setup({
    //   key: 'pk_test_29e07e4025b42a437427fc2abd048e576a2b9b1a',
    //   email: this.userDetails.email,
    //   amount: this.total,
    //   currency: 'NGN',
    //  // ref: ''+Math.floor((Math.random() * 1000000000) + 1),
    //   metadata: {
    //      custom_fields: [
    //         {
    //             display_name: 'Mobile Number',
    //             variable_name: 'mobile_number',
    //             value: this.userDetails.phone
    //         }
    //      ]
    //   },
    //   callback: function(response) {
    //       alert('success. transaction ref is ' + response.reference);
    //   },
    //   onClose: function() {
    //       alert('window closed');
    //   }
    // });
    // handler.openIframe();
  // }

  paymentDone(value) {
    console.log(value);
    const resp = {
      'Amount' : this.amount,
      'Reference' : this.ref
    };

    if ( value.status === 'success') {
      this.basicService.setter(resp);
      this.Clear();
      this.router.navigateByUrl('/private/payment-confirmation');
    } else {
      this.basicService.presentAlert('Error', value.message, 'OK');
    }
  }

  Clear() {
    this.amount = '';
    this.showconfirm = false;
    this.total = 0;
    this.fee = 0;
    this.paystackAmt = 0;
  }
}
