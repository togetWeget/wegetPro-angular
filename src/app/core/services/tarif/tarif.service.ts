import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../message.service';
import {Resultat} from '../../../shared/models/resultat';
import {Tarif} from '../../../shared/models/tarif/tarif';

@Injectable({
  providedIn: 'root'
})
export class TarifService {
  public jwtToken: string;
  private urlTarifs = 'http://wegetback:8080/tarifs';
  private urlTarifsParBlockId = 'http://wegetback:8080/tarifsBlocksId';
  constructor(private http: HttpClient, private messageService: MessageService) {
  }
  loadToken () {
    this.jwtToken = localStorage.getItem('togetToken');
  }
  getAllTarifs(): Observable<Resultat<Tarif[]>> {

    return this.http.get<Resultat<Tarif[]>>(this.urlTarifs)
      .pipe(
        tap(res => {
          this.log(`tarif recuperes`);
        }),
        catchError(this.handleError<Resultat<Tarif[]>>('getAllTarifs', new Resultat<Tarif[]>(null, [], [])))
      );
  }

  ajoutTarif(tarif: Tarif): Observable<Resultat<Tarif>> {
    if (this.jwtToken==null) this.loadToken()
    console.log('methode du service qui ajoute un tarif', tarif);
    return this.http.post<Resultat<Tarif>>(this.urlTarifs, tarif,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`tarif ajouter avec succes : message service=${res.body.prix}`);

        }),
        catchError(this.handleError<Resultat<Tarif>>('ajoutTarif'))
      );


  }

  // obtenir un tarif a partir de id du block
  tarifParBlockId(id: number): Observable<Resultat<Tarif>> {

    return this.http.get<Resultat<Tarif>>(`${this.urlTarifsParBlockId}/${id}`)
      .pipe(
        tap(res => {
          this.log(`tarifs trouves  id=${id}`);
        }),
        catchError(this.handleError<Resultat<Tarif>>('tarifParBlockId'))
      );
  }

  getTarifById(id: number): Observable<Resultat<Tarif>> {

    return this.http.get<Resultat<Tarif>>(`${this.urlTarifs}/${id}`)
      .pipe(
        tap(res => {
          this.log(`block trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<Tarif>>('getTarifById'))
      );
  }

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
