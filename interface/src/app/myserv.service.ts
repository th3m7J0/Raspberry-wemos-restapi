import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyservService {

  constructor( private http: HttpClient) { }

  getData(ipAddress): Observable<any> {
    return this.http.get<any>('http://' + ipAddress + '/getInfo');
  }

  sendData(ipAddress, data: string): Observable<any> {
    return this.http.get<any>('http://' + ipAddress + '/receiveData?data=' + data);
  }

  switchLight(ipAddress): Observable<any> {
    return this.http.get<any>('http://' + ipAddress + '/switchLight');
  }
}
