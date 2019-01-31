import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http-service.service';
import {BasicService} from '../../services/basic.service';
import {AuthenticationService} from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 currentDate: Date = new Date();
 loginModel = {
   'email': '',
   'password' : ''
 };

  constructor(private httpService: HttpService, private basicService: BasicService,
    private authService: AuthenticationService, private router: Router, private faio: FingerprintAIO) { }

  ngOnInit() {
  }

  login() {
    console.log(this.loginModel);
  if (this.loginModel.email === '' || this.loginModel.password === '') {
    this.basicService.presentAlert('Error', 'Please fill required fields.', 'Ok');
    return;
  }
  this.basicService.loader();
  this.httpService.Post('authentication/login', this.loginModel).subscribe((res) => {
    console.log(res);
    this.basicService.loading.dismiss();
            if (res.statusCode === '00') {
      this.authService.login(res.details);
      this.router.navigateByUrl('/private/dashboard');
    } else {
      this.basicService.presentAlert('Error', res.statusMessage, 'Ok');
    }
  });
  }


  LoginWithFingerPrint() {
    // check if email is entered
    if (!this.loginModel.email) {
      this.basicService.presentAlert('Error', 'Please enter registered email address.', 'OK');
      return;
    }
    // check if fingerprint is available
    this.faio.isAvailable().then((result) => {
      if (result === 'face' || result === 'finger') {
        this.faio.show({
          clientId: environment.faioClientId,
          clientSecret: environment.faioClientSecret, // Only necessary for Android
          disableBackup: true,  // Only for Android(optional)
          localizedFallbackTitle: 'Use Pin', // Only for iOS
          localizedReason: 'Please authenticate' // Only for iOS
      })
      .then((res: any) => {
        console.log(res);
          this.GetCustomerDetails(this.loginModel.email);
          this.router.navigateByUrl('/private/dashboard');
      })
      .catch((error: any) => {
        console.log(error);
        this.basicService.presentAlert('Error', 'Verification was not successful.', 'OK');
      });
      } else {
        this.basicService.presentAlert('Error', 'Biometric Authentication is not supported on this device. Please try again.', 'OK');
      }
    });

  }

  GetCustomerDetails(email) {
    this.basicService.loader();
    this.httpService.GetAllRecords('customers/Email/' + email).subscribe((res) => {
      console.log(res);
      this.basicService.loading.dismiss();
      if (res.statusCode === '00') {
        this.authService.login(res.details);
      } else {
        this.basicService.presentAlert('Error', 'Unable to get user details.', 'OK');
      }
    });
   }
}
