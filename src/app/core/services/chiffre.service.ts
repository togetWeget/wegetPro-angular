import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Resultat } from '../../shared/models/resultat';
import { MessageService } from './message.service';
import { Chiffre } from '../../shared/models/chiffre';

@Injectable({
  providedIn: 'root'
})
export class ChiffreService {

  public jwtToken: string;
  private urlChiffres = 'http://wegetback:8080/chiffre';
  
  

  // observables sources
  private chiffreCreerSource = new Subject<Resultat<Chiffre>>();
  private chiffreModifSource = new Subject<Resultat<Chiffre>>();
  private chiffreFiltreSource = new Subject<string>();
  private chiffreSupprimeSource = new Subject<Resultat<boolean>>();

// observables streams
  ChiffreCreer$ = this.chiffreCreerSource.asObservable();
  ChiffreModif$ = this.chiffreModifSource.asObservable();
  ChiffreFiltre$ = this.chiffreFiltreSource.asObservable();
  ChiffreSupprime$ = this.chiffreSupprimeSource.asObservable();

  constructor(private http: HttpClient, private messageService: MessageService,
    private toastr: ToastrService) {
  }

  loadToken () {
    this.jwtToken = localStorage.getItem('togetToken');
  }
  getAllChiffres(): Observable<Resultat<Chiffre[]>> {
    return this.http.get<Resultat<Chiffre[]>>(this.urlChiffres)
      .pipe(
        tap(res => {
          this.log(`Chiffre recuperes`);
        }),
        catchError(this.handleError<Resultat<Chiffre[]>>('getAllChiffres',
          new Resultat<Chiffre[]>(null, [], [])))
      );
  }

  ajoutChiffre(blk: Chiffre): Observable<Resultat<Chiffre>> {
    console.log('methode du service qui ajoute un Chiffre', blk);
    if (this.jwtToken==null) this.loadToken()
    return this.http.post<Resultat<Chiffre>>(this.urlChiffres, blk,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`Chiffre ajouter avec succes : message service=${res.body}`);
          this.toastr.success('Chiffre ajouter avec succes : message service= '+ res.body,
            'Opération réussie');
          this.ChiffreCreer(res);
          // this.filtreChiffre(res.body);
        }),
        catchError(this.handleError<Resultat<Chiffre>>('ajoutChiffre'))
      );


  }

/*  getChiffreById(id: number): Observable<Resultat<Chiffre>> {

    return this.http.get<Resultat<Chiffre>>(`${this.urlChiffres}/${id}`)
      .pipe(
        tap(res => {
          this.log(`Chiffre trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<Chiffre>>('getChiffreById'))
      );
  }*/

  modifierChiffre(blkModif: Chiffre): Observable<Resultat<Chiffre>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.put<Resultat<Chiffre>>(this.urlChiffres, blkModif,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`bloc de libelle  =${res.body}`);
          this.toastr.success('bloc de libelle  = '+ res.body,
            'Opération réussie');
          //this.ChiffretModif(res);
          // this.filtreChiffre(res.body);

        }),
        catchError(this.handleError<Resultat<Chiffre>>('modifierChiffre'))
      );
  }

 /* rechercheChiffreParMc(mc: string): Observable<Array<Chiffre>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.get<Resultat<Array<Chiffre>>>(`${this.urlRechercheBlk}${mc}`,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`Chiffre trouve =${res}`))),
        catchError(this.handleError<Array<Chiffre>>('rechercheChiffreParMc'))
      );
  }*/
  // supprimer un Chiffre
/*  supprimerChiffre(id: number): Observable<Resultat<boolean>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.delete<Resultat<boolean>>(`${this.urlChiffres}/${id}`,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`Chiffre supprime id =${id}`);
          this.toastr.success('Chiffre supprime id = '+ id,
            'Opération réussie');
          this.Chiffresupprime(res);
        }),
        catchError(this.handleError<Resultat<boolean>>('supprimerChiffre'))
      );
  }*/
  // enregistrerPhoto(imageFile: File, libelle: string): Observable<any> {
  //   if (this.jwtToken==null) this.loadToken()
  //   const formData: FormData = new FormData();
  //   formData.append('image_photo', imageFile, libelle);
  //   const req = new HttpRequest('POST', this.urlPhotoChiffres, formData, {
  //     /*reportProgress = true;*/
  //   });
  //   return this.http.request(req)
  //     .pipe(
  //       tap(event => {
  //         this.toastr.success('Image ajouté avec succès',
  //           'Opération réussie');
  //         /* this.log(`photo ajoute nom et prenom =${event.body._nomComplet}`)
  //          this.enseignantModif(event.type.);
  //          this.filtreEnseignant(event.body.nomComplet);*/
  //       }),
  //       catchError(this.handleError<Resultat<Chiffre>>('enregistrerPhoto'))
  //     );
  // }

  ChiffreCreer(res: Resultat<Chiffre>) {
    console.log('Chiffre a ete  creer correctement essaie source');
    this.chiffreCreerSource.next(res);
  }

  ChiffretModif(res: Resultat<Chiffre>) {
    this.chiffreModifSource.next(res);
  }

  filtreChiffre(text: string) {
    this.chiffreFiltreSource.next(text);
  }

  Chiffresupprime(res: Resultat<boolean>) {
    this.chiffreSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('ChiffreService: ' + message);

  }

  ///////////////////////////////////////////
  // recuperer les errurs

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.toastr.error(operation + ' a rencontre un probleme: ' + error.message, 'Erreur');
      console.error(error);


      this.log(`${operation} a rentre un probleme: ${error.message}`);


      return of(result as T);
    };
  }

}
