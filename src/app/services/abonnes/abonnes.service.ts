import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/internal/operators';
import {MessageService} from '../message.service';
import {Resultat} from '../../models/Resultat';

@Injectable({
  providedIn: 'root'
})
export class AbonnesService {
  private abonnesByBlockUrl = 'http://localhost:8080/Personneblocks/';
  private abonnesByIdUrl = 'http://localhost:8080/Personneblocks/';
  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }
  getAllAbonnesByBlock(libelle: string): Observable<Resultat<any[]>> {
    return this.httpClient.get<Resultat<any[]>>(this.abonnesByBlockUrl + libelle).
    pipe(
      tap(res => {
        this.log(`Les Abonnés ont été recupérés !`);
      }),
      catchError(this.handleError<Resultat<any[]>>('getAllBlocks', new Resultat<any[]>(null, [], [])))
    );
  }
  /*getAbonnesById(id:number): Observable<T>{
  //slaut
  }*/
  private log(message: string) {
    this.messageService.add('blockService: ' + message);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} a rentre un probleme: ${error.message}`);
      return of(result as T);
    };
  }
}

