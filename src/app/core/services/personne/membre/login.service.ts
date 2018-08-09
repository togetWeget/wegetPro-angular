import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {catchError, map, observeOn, tap, timeout} from 'rxjs/internal/operators';
import {Observable, of, Subject, interval, isObservable} from 'rxjs';
import {HttpClient, HttpRequest, HttpResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public result: any;
  constructor(public  http: HttpClient, private router: Router) {

  }
  Authentification(url: any, data: any): any {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post<HttpResponse<any>>(url, data, { headers: headers, observe: 'response' })
    .subscribe((resul) => {
        if (resul.status === 200) {
          console.log(resul.headers.get('Authorization'));
          localStorage.setItem('togetToken', resul.headers.get('Authorization'));
          this.router.navigate(['/admin']);
         // let strValue: string = localStorage.getItem('togetToken');
        } else {
          alert('Authentification incorrecte!');
        }
      },
      err => {
            console.log('Error: ' + err);
      });
  }

  DestroyLocal() {
      localStorage.removeItem('togetToken');
  }
}
