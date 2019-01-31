import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';


const TOKEN_KEY = 'auth-token';
const user = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
   }

   checkToken() {
     this.storage.get(user).then(res => {
       if (res) {
         this.authenticationState.next(true);
       }
     });
   }

   login(details) {
     return this.storage.set(user, details).then(() => {
      this.authenticationState.next(true);
     });
   }

   logout() {
     return this.storage.remove(user).then(() => {
      this.authenticationState.next(false);
     });
   }

   isAuthenticated() {
     return this.authenticationState.value;
   }
}
