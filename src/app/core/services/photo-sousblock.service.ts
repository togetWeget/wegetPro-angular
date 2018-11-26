import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {MessageService} from './message.service';
import {Resultat} from '../../shared/models/resultat';
import {PhotoSousblock} from '../../shared/models/photo-sousblock';
import { ToastrService } from 'ngx-toastr';
import { OutilsService } from './outils.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoSousblockService {
  public jwtToken: string;
  private urlPhotoSousblocksInfos = `${this.outils.getBaseUrl()}/gallery`;
  private urlPhotoSousblocksInfos2 = `${this.outils.getBaseUrl()}/galleryParIdSousBlock`;
  private urlPhotoSousblocks = `${this.outils.getBaseUrl()}/sousblockphoto`;
  private urlGetPhotoSousblocks = `${this.outils.getBaseUrl()}/getsoublockphoto`;
  private urlRechercheBlk = `${this.outils.getBaseUrl()}/rechercheBlock?mc=`;


  constructor(private http: HttpClient, private messageService: MessageService,
    private toastr: ToastrService, private outils: OutilsService) {
  }

  loadToken () {
    this.jwtToken = localStorage.getItem('togetToken');
  }
  getAllPhotoSousblocks(): Observable<Resultat<PhotoSousblock[]>> {
    return this.http.get<Resultat<PhotoSousblock[]>>(this.urlGetPhotoSousblocks)
      .pipe(
        tap(res => {
          this.log(`block recuperes`);
        }),
        catchError(this.handleError<Resultat<PhotoSousblock[]>>('getAllPhotoSousblocks',
          new Resultat<PhotoSousblock[]>(null, [], [])))
      );
  }
  getAllphotosForSousblock(id: number): Observable<Resultat<PhotoSousblock[]>> {
    return this.http.get<Resultat<PhotoSousblock[]>>(`${this.urlGetPhotoSousblocks}/${id}`)
      .pipe(
        tap(res => {
          this.log(`block recuperes`);
        }),
        catchError(this.handleError<Resultat<PhotoSousblock[]>>('getAllPhotoSousblocksParPersonne',
          new Resultat<PhotoSousblock[]>(null, [], [])))
      );
  }

  ajoutPhotoSousblock(blk: PhotoSousblock): Observable<Resultat<PhotoSousblock>> {
    console.log('methode du service qui ajoute un block', blk);
    if (this.jwtToken==null) this.loadToken()
    return this.http.post<Resultat<PhotoSousblock>>(this.urlPhotoSousblocksInfos, blk,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`photo ajouté avec succes : message service=${res.body}`);
          this.toastr.success('photo ajouteé avec succes : message service= '+ res.body,
            'Opération réussie');
        }),
        catchError(this.handleError<Resultat<PhotoSousblock>>('ajoutPhotoSousblock'))
      );
  }

  modifierPhotoSousblock(blk: PhotoSousblock): Observable<Resultat<PhotoSousblock>> {
    console.log('methode du service qui ajoute un block', blk);
    if (this.jwtToken==null) this.loadToken()
    return this.http.put<Resultat<PhotoSousblock>>(this.urlPhotoSousblocks, blk,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`photo ajouté avec succes : message service=${res.body}`);
          this.toastr.success('photo ajouteé avec succes : message service= '+ res.body,
            'Opération réussie');
        }),
        catchError(this.handleError<Resultat<PhotoSousblock>>('ajoutPhotoSousblock'))
      );
  }

  getAllphotosBySousBlockId(id: number): Observable<Resultat<PhotoSousblock[]>> {

    return this.http.get<Resultat<PhotoSousblock[]>>(`${this.urlPhotoSousblocksInfos2}/${id}`)
      .pipe(
        tap(res => {
          this.log(`block trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<PhotoSousblock[]>>('getPhotoSousblockById'))
      );
  }

  getPhotoSousblockById(id: number): Observable<Resultat<PhotoSousblock>> {

    return this.http.get<Resultat<PhotoSousblock>>(`${this.urlGetPhotoSousblocks}/${id}`)
      .pipe(
        tap(res => {
          this.log(`block trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<PhotoSousblock>>('getPhotoSousblockById'))
      );
  }

  // supprimer un block
  supprimerPhotoSousblock(id: number): Observable<Resultat<boolean>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.delete<Resultat<boolean>>(`${this.urlPhotoSousblocks}/${id}`,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`block supprime id =${id}`);
          this.toastr.success('block supprime id = '+ id,
            'Opération réussie');
        }),
        catchError(this.handleError<Resultat<boolean>>('supprimerPhotoSousblock'))
      );
  }
  private log(message: string) {
    this.messageService.add('blockService: ' + message);

  }

  ///////////////////////////////////////////
  // recuperer les errurs

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // this.toastr.error(operation + ' a rencontre un probleme: ' + error.message, 'Erreur');
      console.error(error);


      this.log(`${operation} a rentre un probleme: ${error.message}`);


      return of(result as T);
    };
  }

}
