import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
// header = {
//   'Accept' : 'text/json',
//   'content-type': 'application/*+json',
//   'x-ibm-client-secret' : environment.secret,
//   'x-ibm-client-id' : environment.clientId
// };
//  headers = new HttpHeaders(this.header);

  constructor(private http: HttpClient) { }

  GetAllRecords(path) {
    return this.http.get<any>(environment.apiUrl + path); // {headers: this.headers}
  }

  Post(path, data) {
    return this.http.post<any>(environment.apiUrl + path, data);
  }

  Put(path, data) {
    return this.http.put<any>(environment.apiUrl + path, data);
  }
}
