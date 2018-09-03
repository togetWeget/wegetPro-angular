import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService} from '../../../../firebaseDir/auth-firebase.service';
import {HttpClient, HttpRequest, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Resultat} from '../../../../shared/models/Resultat';
import {Block} from '../../../../shared/models/block';
import {Tarif} from '../../../../shared/models/tarif/tarif';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public result: any;
  public jwtToken: string;
  private urlBlocks = 'http://wegetback:8080/blocks';
   private urlTarifs = 'http://wegetback:8080/tarifs';
  private urlTarifsParBlockId = 'http://wegetback:8080/tarifsBlocksId';
  private urlPhoto = 'http://wegetback:8080/photoBlock';
  private urlPhoto1 = 'http://wegetback:8080/getPhoto';
  private urlRechercheBlk = 'http://wegetback:8080/rechercheBlock?mc=';

  ///////////////// constructeur de login service/////////////////////////////////////////

  constructor(public  http: HttpClient, private router: Router,
    private firebaseDir: AuthFirebaseService) {

  }
  ////////////////les differente methodes///////////////////////////////////
  Authentification(url: any, data: any, modal?: any): any {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post<HttpResponse<any>>(url, data, { headers: headers, observe: 'response' })
    .subscribe((resul) => {
        if (resul.status === 200) {
          console.log(resul.headers.get('Authorization'));
          localStorage.setItem('togetToken', resul.headers.get('Authorization'));
		   localStorage.setItem('log', data.login);
          this.router.navigate(['/admin']);
         // let strValue: string = localStorage.getItem('togetToken');
         modal.close();
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
      localStorage.removeItem('log');
      this.firebaseDir.signOutUser();
  }



}
//modifié
