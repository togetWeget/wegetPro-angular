import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/internal/operators';
import {MessageService} from '../message.service';
import {Resultat} from '../../../shared/models/Resultat.model';
import {Detailblocks} from '../../../shared/models/detailblock';

@Injectable({
  providedIn: 'root'
})
export class AbonnesService {
  private allAbonnesByBlockIdUrl = 'http://localhost:8080/abonneParblocks/';
  private abonneByIdUrl = 'http://localhost:8080/detailBlock/';

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }

  getAllAbonnesByBlock(id: number): Observable<Resultat<Detailblocks[]>> {
    return this.httpClient.get<Resultat<Detailblocks[]>>(this.allAbonnesByBlockIdUrl + id).pipe(
      tap(res => {
        this.log(`Les Abonnés ont été recupérés !`);
        console.log('vrifier le retour du service', res.body);
      }),
      catchError(this.handleError<Resultat<Detailblocks[]>>('getAllAbonnesByBlock', new Resultat<Detailblocks[]>(null, [], [])))
    );
  }

  getAbonnesById(id: number): Observable<Resultat<Detailblocks>> {
    return this.httpClient.get<Resultat<Detailblocks>>(this.abonneByIdUrl + id)
      .pipe(
      tap(res => {
        this.log(`L'abonné a été récupéré !`);
      }),
      catchError(this.handleError<Resultat<Detailblocks>>('getAbonnesById'))
    );
  }

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

