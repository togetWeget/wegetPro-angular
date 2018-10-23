import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {MessageService} from './message.service';
import {Resultat} from '../../shared/models/resultat';
import {FlashInfo} from '../../shared/models/flash-info';
import { ToastrService } from 'ngx-toastr';
import { OutilsService } from './outils.service';

@Injectable({
  providedIn: 'root'
})
export class FlashInfoService {
	public jwtToken: string;
  private urlFlashInfos = `${this.outils.getBaseUrl()}/flashInfo`;
	private urlFlashInfosParSousBlock = `${this.outils.getBaseUrl()}/flashInfoSousBlock`;

	 // observables sources
  private flashInfoCreerSource = new Subject<Resultat<FlashInfo>>();
  private flashInfoModifSource = new Subject<Resultat<FlashInfo>>();
  private flashInfoFiltreSource = new Subject<string>();
  private flashInfoSupprimeSource = new Subject<Resultat<boolean>>();

// observables streams
  // flashInfoCreer$ = this.flashInfoCreerSource.asObservable();
  // flashInfoModif$ = this.flashInfoModifSource.asObservable();
  // flashInfoFiltre$ = this.flashInfoFiltreSource.asObservable();
  // flashInfoSupprime$ = this.flashInfoSupprimeSource.asObservable();


  constructor(private http: HttpClient, private messageService: MessageService,
    private toastr: ToastrService, private outils: OutilsService) { }

  loadToken () {
    this.jwtToken = localStorage.getItem('togetToken');
  }

  getAllFlashInfos(): Observable<Resultat<FlashInfo[]>> {
    return this.http.get<Resultat<FlashInfo[]>>(this.urlFlashInfos)
      .pipe(
        tap(res => {
          this.log(`flashInfo recuperes`);
        }),
        catchError(this.handleError<Resultat<FlashInfo[]>>('getAllFlashInfos',
          new Resultat<FlashInfo[]>(null, [], [])))
      );
  }

  ajoutFlashInfo(blk: FlashInfo): Observable<Resultat<FlashInfo>> {
    console.log('methode du service qui ajoute un flashInfo', blk);
    if (this.jwtToken==null) this.loadToken();
    return this.http.post<Resultat<FlashInfo>>(this.urlFlashInfos, blk,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`flashInfo ajouter avec succes : message service=${res.body.contenu}`);
          this.toastr.success('flashInfo ajouter avec succes : message service= '+ res.body.contenu,
            'Opération réussie');
          // this.flashInfoCreer(res);
          // this.filtreflashInfo(res.body.nom);
        }),
        catchError(this.handleError<Resultat<FlashInfo>>('ajoutFlashInfo'))
      );


  }

  getFlashInfoById(id: number): Observable<Resultat<FlashInfo>> {

    return this.http.get<Resultat<FlashInfo>>(`${this.urlFlashInfos}/${id}`)
      .pipe(
        tap(res => {
          this.log(`flashInfo trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<FlashInfo>>('getFlashInfoById'))
      );
  }

  getFlashInfoBySousBlock(id: number): Observable<Resultat<FlashInfo>> {

    return this.http.get<Resultat<FlashInfo>>(`${this.urlFlashInfosParSousBlock}/${id}`)
      .pipe(
        tap(res => {
          this.log(`flashInfo trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<FlashInfo>>('getFlashInfoById'))
      );
  }

  modifierFlashInfo(blkModif: FlashInfo): Observable<Resultat<FlashInfo>> {
    if (this.jwtToken==null) this.loadToken();
    return this.http.put<Resultat<FlashInfo>>(this.urlFlashInfos, blkModif,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`bloc de nom  =${res.body.contenu}`);
          this.toastr.success('bloc de nom  = '+ res.body.contenu,
            'Opération réussie');
          //this.flashInfotModif(res);
          // this.filtreflashInfo(res.body.nom);

        }),
        catchError(this.handleError<Resultat<FlashInfo>>('modifierFlashInfo'))
      );
  }

  // supprimer un flashInfo
  supprimerFlashInfo(id: number): Observable<Resultat<boolean>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.delete<Resultat<boolean>>(`${this.urlFlashInfos}/${id}`,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`flashInfo supprime id =${id}`);
          this.toastr.success('flashInfo supprime id = '+ id,
            'Opération réussie');
          // this.flashInfosupprime(res);
        }),
        catchError(this.handleError<Resultat<boolean>>('supprimerFlashInfo'))
      );
  }

  private log(message: string) {
    this.messageService.add('flashInfoService: ' + message);

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
