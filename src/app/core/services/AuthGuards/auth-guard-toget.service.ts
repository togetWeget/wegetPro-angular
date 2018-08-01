import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlSegment, UrlTree
} from '@angular/router';
import {Url} from 'url';
import {equal} from 'assert';
import {HttpClient, HttpRequest, HttpResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardTogetService implements CanActivate {

  constructor(private route: ActivatedRoute, public router: Router, public http: HttpClient) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(' verification ...' + route.url);
    const urlcurrent = String(route.url);
    const urlAdmin: any = 'admin';
    console.log(' verification ...' + urlcurrent);
    const urllogin: any = 'login';
    const urlregister: any = 'register';

    switch (urlcurrent) {
      case urlAdmin :

        this.getToken();
        if (this.isLoggedIn()) {
          return true;
        } else {
          this.router.navigate(['/login']);
        }

        break;

      case urllogin:
        this.getToken();
        if (this.isLoggedIn()) {
          this.router.navigate(['/admin']);
        } else {
          return true;
        }
        break;

      case urlregister :
        this.getToken();
        if (this.isLoggedIn()) {
          this.router.navigate(['/admin']);
        } else {
          return true;
        }
        break;

      default :
        this.getToken();
        return true;

    }


  }

  private isLoggedIn(): boolean {
    const localStorange = localStorage.getItem('togetToken');

    if (localStorange) {
      return true;
    } else {
      return false;
    }
  }

  getToken() {
    // this.TokenCheckIn();
    alert(1);

  }

  private TokenCheckIn() {
    const localStorange = localStorage.getItem('togetToken');

    const data: any = {Token: localStorange};
    const url = 'http://localhost:8080/TokenValidate';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post<HttpResponse<any>>(url, data, {headers: headers, observe: 'response'}).subscribe((resul) => {
        if (resul.status === 200) {
          console.log(resul.headers.get('Authorization'));
          localStorage.setItem('togetToken', resul.headers.get('Authorization'));
        } else {
          console.log('Authentification incorrecte!');
          localStorage.removeItem('togetToken');
         // this.router.navigate(['/login']);
        }
      },
      err => {
        console.log('Error: ' + err);
      });
  }
}

