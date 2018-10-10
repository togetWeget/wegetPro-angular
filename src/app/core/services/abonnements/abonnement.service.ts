import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../message.service';
import {Observable, of} from 'rxjs';
import {Resultat} from '../../../shared/models/resultat';
import {Tarif} from '../../../shared/models/tarif/tarif';
import {Detailblock} from '../../../shared/models/detailblock';
import {OutilsService} from '../outils.service';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

  private urlTarifs = `${this.outils.getBaseUrl()}/tarifs`;
  private urlTarifsParBlockId = `${this.outils.getBaseUrl()}/tarifsBlocksId/`;
  private urlBlockParAbonne = `${this.outils.getBaseUrl()}/tousLesBlockParAbonne/`;
  constructor(private httpClient: HttpClient, private messageService: MessageService, private outils: OutilsService) {
  }
  getAlltarifsByBlocksId(id: number): Observable<Resultat<Tarif[]>> {
    return this.httpClient.get<Resultat<Tarif[]>>(this.urlTarifsParBlockId + id)
      .pipe(
        tap(res => {
          this.log(`tarif recuperes`);
        }),
        catchError(this.handleError<Resultat<Tarif[]>>('getAllTarifs', 
          new Resultat<Tarif[]>(null, [], [])))
      );
  }
  getAllTarifs(): Observable<Resultat<Tarif[]>> {
    return this.httpClient.get<Resultat<Tarif[]>>(this.urlTarifs)
      .pipe(
        tap(res => {
          this.log(`tarif recuperes`);
        }),
        catchError(this.handleError<Resultat<Tarif[]>>('getAllTarifs', 
          new Resultat<Tarif[]>(null, [], [])))
      );
  }
  // obtenir un tarif a partir de id du block
  getTarifParBlockId(id: number): Observable<Resultat<Tarif>> {
    return this.httpClient.get<Resultat<Tarif>>(`${this.urlTarifsParBlockId}/${id}`)
      .pipe(
        tap(res => {
          this.log(`tarifs trouves  id=${id}`);
        }),
        catchError(this.handleError<Resultat<Tarif>>('tarifParBlockId'))
      );
  }
  /*getAllBlockByAbonneId(log:string):Observable<Resultat<Detailblock>>{
    return this.httpClient.get<Resultat<Detailblock>>(this.urlBlockParAbonne+log)
    .pipe(
      tap(res=>{
        this.log(`les Blocks pour un abonne recuperes`);
      }),
      catchError(this.handleError<Resultat<Tarif>>('getAllBlockByAbonneId'))
    );
  }*/
  private log(message: string) {
    this.messageService.add('tarifService: ' + message);

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error);


      this.log(`${operation} a rentre un probleme: ${error.message}`);


      return of(result as T);
    };
  }
}
