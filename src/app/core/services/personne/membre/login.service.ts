import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService} from '../../../../firebaseDir/auth-firebase.service';
import {HttpClient, HttpRequest, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Resultat} from '../../../../shared/models/Resultat';
import {Block} from '../../../../shared/models/block';
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
  modifierBlock(blkModif: Block): Observable<Resultat<Block>> {
   if (this.jwtToken==null) this.loadToken()
    console.log(this.jwtToken);
    return this.http.post<Resultat<Block>>(this.urlBlocks, blkModif, 
      {headers: new  HttpHeaders({'Authorization': this.jwtToken})})

  }
  getAllBlocks(): Observable<Resultat<Block[]>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.get<Resultat<Block[]>>(this.urlBlocks,
      {headers: new  HttpHeaders({'Authorization': this.jwtToken})})

  }

  ajoutBlock(blk: Block): Observable<Resultat<Block>> {
    if (this.jwtToken==null) this.loadToken()
    console.log('methode du service qui ajoute un block', blk);
    return this.http.post<Resultat<Block>>(this.urlBlocks, blk,
      {headers:new  HttpHeaders({'Authorization': this.jwtToken})})


  }

  getBlockById(id: number): Observable<Resultat<Block>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.get<Resultat<Block>>(`${this.urlBlocks}/${id}`,
      {headers:new  HttpHeaders({'Authorization': this.jwtToken})})

  }

  DestroyLocal() {
      localStorage.removeItem('togetToken');
      localStorage.removeItem('log');
      this.firebaseDir.signOutUser();
  }
  enregistrerPhoto(imageFile: File, libelle: string): Observable<any> {
    if (this.jwtToken==null) this.loadToken()
    const formData: FormData = new FormData();
    formData.append('image_photo', imageFile, libelle);
    const req = new HttpRequest('POST', this.urlPhoto, formData, {
      /*reportProgress = true;*/
    });
    return this.http.request(req)

  }

  getAllTarifs(): Observable<Resultat<Tarif[]>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.get<Resultat<Tarif[]>>(this.urlTarifs,{headers:new  HttpHeaders({'Authorization': this.jwtToken})})

  }

  ajoutTarif(tarif: Tarif): Observable<Resultat<Tarif>> {
    console.log('methode du service qui ajoute un tarif', tarif);
    if (this.jwtToken==null) this.loadToken()
    return this.http.post<Resultat<Tarif>>(this.urlTarifs, tarif,{headers:new  HttpHeaders({'Authorization': this.jwtToken})})

  }

  // obtenir un tarif a partir de id du block
  tarifParBlockId(id: number): Observable<Resultat<Tarif>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.get<Resultat<Tarif>>(`${this.urlTarifsParBlockId}/${id}`,{headers:new  HttpHeaders({'Authorization': this.jwtToken})})

  }

  getTarifById(id: number): Observable<Resultat<Tarif>> {
    if (this.jwtToken == null) this.loadToken()
    return this.http.get<Resultat<Tarif>>(`${this.urlTarifs}/${id}`,{headers:new  HttpHeaders({'Authorization': this.jwtToken})})

  }
}
//modifié