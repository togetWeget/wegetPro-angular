import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {Resultat} from '../../../shared/models/resultat';
import {Detailblock} from '../../../shared/models/detailblock';
import {Abonnes} from '../../../shared/models/abonnes';


@Injectable({
  providedIn: 'root'
})
export class AbonnesService {
  private allAbonnesByBlockIdUrl = 'http://wegetback:8080/tousLesAbonnesParBlock/';
  private abonneByIdUrl = 'http://wegetback:8080/profil/';
  private profilByIdUrl = 'http://wegetback:8080/detailBlock/';
  private abonneByLogUrl = 'http://wegetback:8080/profilAbonneLogin/';
  private abonnesUrl = 'http://wegetback:8080/abonnes/';
   private abonnesComptence = 'http://wegetback:8080/rechercheParComptence/';
  
  
  private jwtToken = null;
  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }

  getAllAbonnes(): Observable<Resultat<Abonnes[]>> {
    return this.httpClient.get<Resultat<Abonnes[]>>(this.abonnesUrl).pipe(
      tap(res => {
        this.log(`Les Abonnés ont été recupérés !`);
        console.log('vrifier le retour du service', res.body);
      }),
      catchError(this.handleError<Resultat<Abonnes[]>>('getAllAbonnes', 
        new Resultat<Abonnes[]>(null, [], [])))
    );
  }

  getAllAbonnesByBlock(id: number): Observable<Resultat<Detailblock[]>> {
    return this.httpClient.get<Resultat<Detailblock[]>>(this.allAbonnesByBlockIdUrl + id).pipe(
      tap(res => {
        this.log(`Les Abonnés ont été recupérés !`);
        console.log('vrifier le retour du service', res.body);
      }),
      catchError(this.handleError<Resultat<Detailblock[]>>('getAllAbonnesByBlock', 
        new Resultat<Detailblock[]>(null, [], [])))
    );
  }

  getAbonnesById(id: number): Observable<Resultat<Detailblock>> {
    return this.httpClient.get<Resultat<Detailblock>>(this.abonneByIdUrl + id)
      .pipe(
      tap(res => {
        this.log(`L'abonné a été récupéré !`);
      }),
      catchError(this.handleError<Resultat<Detailblock>>('getAbonnesById'))
    );
  }
  getProfilById(id: number): Observable<Resultat<Detailblock>> {
    if(this.jwtToken === null){
      this.loadToken();
    } 
    return this.httpClient.get<Resultat<Detailblock>>(this.profilByIdUrl + id)
      .pipe(
      tap(res => {
        this.log(`L'abonné a été récupéré !`);
      }),
      catchError(this.handleError<Resultat<Detailblock>>('getProfilById'))
    );
  }
  getAbonnesByLog(log: string): Observable<Resultat<Detailblock>> {
    return this.httpClient.get<Resultat<Detailblock>>(this.abonneByLogUrl + log)
      .pipe(
      tap(res => {
        this.log(`L'abonné a été récupéré !`);
      }),
      catchError(this.handleError<Resultat<Detailblock>>('getAbonnesByLog'))
    );
  }
   getAbonnesByCompetence(competence: string): Observable<Resultat<Detailblock>> {
    return this.httpClient.get<Resultat<Detailblock>>(this.abonnesComptence + competence)
      .pipe(
      tap(res => {
        this.log(`L'abonné a été récupéré !`);
      }),
      catchError(this.handleError<Resultat<Detailblock>>('getAbonnesByCompetence'))
    );
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('togetToken');
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

