import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {MessageService} from './message.service';
import {Resultat} from '../../shared/models/resultat';
import {DocumentSousBlock} from '../../shared/models/document-Sous-block';
import { ToastrService } from 'ngx-toastr';
import { OutilsService } from './outils.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentSousBlockService {
	public jwtToken: string;
  private urlDocumentSousBlocksInfos = `${this.outils.getBaseUrl()}/document`;
  private urlDocumentSousBlocksInfos2 = `${this.outils.getBaseUrl()}/documentParIdSousBlock`;
  private urlDocumentSousBlocks = `${this.outils.getBaseUrl()}/sousblockDocument`;
  private urlGetDocumentSousBlocks = `${this.outils.getBaseUrl()}/getsoublockDocument`;
  private urlRechercheBlk = `${this.outils.getBaseUrl()}/rechercheBlock?mc=`;


  constructor(private http: HttpClient, private messageService: MessageService,
    private toastr: ToastrService, private outils: OutilsService) {
  }

  loadToken () {
    this.jwtToken = localStorage.getItem('togetToken');
  }
  getAllDocumentSousBlocks(): Observable<Resultat<DocumentSousBlock[]>> {
    return this.http.get<Resultat<DocumentSousBlock[]>>(this.urlGetDocumentSousBlocks)
      .pipe(
        tap(res => {
          this.log(`block recuperes`);
        }),
        catchError(this.handleError<Resultat<DocumentSousBlock[]>>('getAllDocumentSousBlocks',
          new Resultat<DocumentSousBlock[]>(null, [], [])))
      );
  }
  getAllDocumentsForSousblock(id: number, version: number, libelle: string): Observable<Resultat<DocumentSousBlock[]>> {
    return this.http.get<Resultat<DocumentSousBlock[]>>(`${this.urlGetDocumentSousBlocks}/${id}`)
      .pipe(
        tap(res => {
          this.log(`block recuperes`);
        }),
        catchError(this.handleError<Resultat<DocumentSousBlock[]>>('getAllDocumentSousBlocksParPersonne',
          new Resultat<DocumentSousBlock[]>(null, [], [])))
      );
  }

  ajoutDocumentSousBlock(blk: DocumentSousBlock): Observable<Resultat<DocumentSousBlock>> {
    console.log('methode du service qui ajoute un block', blk);
    if (this.jwtToken==null) this.loadToken()
    return this.http.post<Resultat<DocumentSousBlock>>(this.urlDocumentSousBlocksInfos, blk,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`document ajouté avec succes : message service=${res.body}`);
          this.toastr.success('document ajouteé avec succes : message service= '+ res.body,
            'Opération réussie');
        }),
        catchError(this.handleError<Resultat<DocumentSousBlock>>('ajoutDocumentSousBlock'))
      );
  }

  modifierDocumentSousBlock(blk: DocumentSousBlock): Observable<Resultat<DocumentSousBlock>> {
    console.log('methode du service qui ajoute un block', blk);
    if (this.jwtToken==null) this.loadToken()
    return this.http.put<Resultat<DocumentSousBlock>>(this.urlDocumentSousBlocks, blk,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`document ajouté avec succes : message service=${res.body}`);
          this.toastr.success('document ajouteé avec succes : message service= '+ res.body,
            'Opération réussie');
        }),
        catchError(this.handleError<Resultat<DocumentSousBlock>>('ajoutDocumentSousBlock'))
      );
  }

  getAllDocumentsBySousBlockId(id: number): Observable<Resultat<DocumentSousBlock[]>> {

    return this.http.get<Resultat<DocumentSousBlock[]>>(`${this.urlDocumentSousBlocksInfos2}/${id}`)
      .pipe(
        tap(res => {
          this.log(`block trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<DocumentSousBlock[]>>('getDocumentSousBlockById'))
      );
  }

  getDocumentSousBlockById(id: number): Observable<Resultat<DocumentSousBlock>> {

    return this.http.get<Resultat<DocumentSousBlock>>(`${this.urlGetDocumentSousBlocks}/${id}`)
      .pipe(
        tap(res => {
          this.log(`block trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<DocumentSousBlock>>('getDocumentSousBlockById'))
      );
  }

  // supprimer un block
  supprimerDocumentSousBlock(id: number): Observable<Resultat<boolean>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.delete<Resultat<boolean>>(`${this.urlDocumentSousBlocks}/${id}`,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`block supprime id =${id}`);
          this.toastr.success('block supprime id = '+ id,
            'Opération réussie');
        }),
        catchError(this.handleError<Resultat<boolean>>('supprimerDocumentSousBlock'))
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
