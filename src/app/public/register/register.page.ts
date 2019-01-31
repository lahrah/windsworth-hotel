import { Component, OnInit } from '@angular/core';
import { BasicService } from '../../services/basic.service';
import { HttpService } from '../../services/http-service.service';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Promise } from 'q';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
registerForm: FormGroup;

  constructor(private fb: FormBuilder, private basicService: BasicService,
    private httpService: HttpService, private authService: AuthenticationService, private router: Router ) {

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(11)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPwd: ['', [Validators.required]]
    });

   }

  ngOnInit() {
  }

 Register() {
  console.log(this.registerForm.value);
  this.basicService.loader();
  const password = this.registerForm.controls['password'].value;
  const cpassword = this.registerForm.controls['confirmPwd'].value;
  if (password !== cpassword) {
    this.basicService.presentAlert('Error', 'Passwords do not match', 'OK');
    return;
  }
  if (!this.registerForm.valid) {
    this.basicService.presentAlert('Error', 'Please fill all the required fields.', 'OK');
    return;
  }
  this.httpService.Post('authentication/register', this.registerForm.value).subscribe((res) => {
    console.log(res);
    this.basicService.loading.dismiss();
    if (res.statusCode === '00') {
       // create wallet
      this.CreateWallet(res.customerId).then(() => {
        this.GetCustomerDetails(res.customerId);
      this.router.navigateByUrl('/private/dashboard');
      });
    } else {
      this.basicService.presentAlert('Error', res.statusMessage, 'OK');
    }
  });
 }

 GetCustomerDetails(customerId) {
  this.httpService.GetAllRecords('customers/' + customerId).subscribe((res) => {
    console.log(res);
    if (res.statusCode === '00') {
      this.authService.login(res.details);
    }
  });
 }

 CreateWallet(customerId) {
   const wallet = {
    'customerId': customerId,
    'description': 'customer wallet'
   };

  return Promise((resolve, reject) => {
    this.httpService.Post('wallets', wallet).subscribe((res) => {
      console.log(res);
    if (res.statusCode === '00') {
      resolve(true);
    }
    });
  });
 }
}
