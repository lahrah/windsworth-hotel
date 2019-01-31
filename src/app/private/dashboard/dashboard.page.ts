import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import {HttpService} from '../../services/http-service.service';
import { Wallet } from '../../services/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
currentDate: Date = new Date();
userDetails: any;
gotten = false;
wallet: Wallet = {
  walletNumber: 0,
  availableBalance: 0,
  ledgerBalance: 0,
  description: '',
  statusId: 0,
  customerId: 0,
  dateCreated: ''
};

  constructor(private storage: Storage, private authService: AuthenticationService,
    private router: Router, private httpService: HttpService) {
  }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      console.log(val);
      this.userDetails = val;
      this.GetWalletDetails();
      this.gotten = true;
    });
    console.log(this.userDetails);
  }

  GetWalletDetails() {
    this.httpService.GetAllRecords('wallets/customer/' + this.userDetails.customerId).subscribe((res) => {
      console.log(res);
      if (res.statusCode === '00') {
        this.wallet = res.wallets[0];
        console.log(this.wallet);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/public/login');
  }
}
