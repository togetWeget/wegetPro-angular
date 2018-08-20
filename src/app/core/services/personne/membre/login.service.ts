import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService} from '../../../../firebaseDir/auth-firebase.service';
import {HttpClient, HttpRequest, HttpResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public result: any;
  public jwtToken: string;
  constructor(public  http: HttpClient, private router: Router,
    private firebaseDir: AuthFirebaseService) {

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
          alert('Authentification correcte!');
        } else {
          alert('Authentification incorrecte!');
        }
      },
      err => {
            console.log('Error: ' + err);
      });
  }

  loadToken () {
    this.jwtToken = localStorage.getItem('togetToken');
  }

  DestroyLocal() {
      localStorage.removeItem('togetToken');
      this.firebaseDir.signOutUser();
  }
}
