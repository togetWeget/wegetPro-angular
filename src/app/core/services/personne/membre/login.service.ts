import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService} from '../../../../firebaseDir/auth-firebase.service';
import {HttpClient, HttpRequest, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Resultat} from '../../../../shared/models/Resultat';
import {Block} from '../../../../shared/models/block';
import {Tarif} from '../../../../shared/models/tarif/tarif';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {InfoMembreService} from '../../info-membre/info-membre.service';

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
    private firebaseDir: AuthFirebaseService, private InfoM: InfoMembreService) {

    }
  ////////////////les differente methodes///////////////////////////////////
  Authentification(url: any, data: any, modal?: any): any {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
   return  this.http.post<HttpResponse<any>>(url, data, { headers: headers, observe: 'response' });
  }

  loadToken () {
    this.jwtToken = localStorage.getItem('togetToken');
  }


  DestroyLocal() {
	  localStorage.clear();
      this.firebaseDir.signOutUser();
  }



}
//modifié
