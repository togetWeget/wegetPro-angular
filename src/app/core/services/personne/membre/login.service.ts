import {Injectable} from '@angular/core';
import {catchError, map, observeOn, tap, timeout} from 'rxjs/internal/operators';
import {Observable, of, Subject, interval, isObservable} from 'rxjs';
import {HttpClient, HttpRequest, HttpResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public result: any;

  constructor(public  http: HttpClient) {

  }

  Authentification(url: any, data: any): any {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post<HttpResponse<any>>(url, data, {headers: headers, observe: 'response'}).subscribe((resul) => {
        if (resul.status === 200) {
          console.log(resul.headers.get('Authorization'));
          localStorage.setItem('togetToken', resul.headers.get('Authorization'));
          // let strValue: string = localStorage.getItem('togetToken');
          location.href = '/admin';
        } else {
          alert('Authentification incorrecte!');
        }
      },
      err => {
        console.log('Error: ' + err);
        alert('Alert! erreur. Il semble vous n\etes pas enregistré...');
      });
  }

  DestroyLocal() {
    localStorage.removeItem('togetToken');
    location.href = '/login';
  }
}
