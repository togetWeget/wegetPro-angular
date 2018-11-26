import {Injectable} from '@angular/core';
import {Observable, of, Subject, BehaviorSubject} from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {Resultat} from '../../../shared/models/resultat';
import {Detailblock} from '../../../shared/models/detailblock';
import {Abonnes} from '../../../shared/models/abonnes';
import {OutilsService} from '../outils.service';



@Injectable({
  providedIn: 'root'
})
export class AbonnesService {
  private allAbonnesByBlockIdUrl = `${this.outils.getBaseUrl()}/tousLesAbonnesParBlock/`;
  private abonneByIdUrl = `${this.outils.getBaseUrl()}/profil/`;
  private profilByIdUrl = `${this.outils.getBaseUrl()}/detailBlock/`;
  private abonneByLogUrl = `${this.outils.getBaseUrl()}/profilAbonneLogin/`;
  private abonnesUrl = `${this.outils.getBaseUrl()}/abonnes/`;
<<<<<<< HEAD
  private rechercheParComptence = `${this.outils.getBaseUrl()}/rechercheParComptence/`;
  private rechercheParVille = `${this.outils.getBaseUrl()}/rechercheParVille/`;
  private rechercheParCompOuVille =`${this.outils.getBaseUrl()}/rechercheParComptenceOuVille/`;
=======
  private abonnesComptence = `${this.outils.getBaseUrl()}/rechercheParComptence/`;
>>>>>>> develop
  public nbVueSubject$ = new BehaviorSubject<number>(0);
  
  
  private jwtToken = null;
  constructor(private httpClient: HttpClient, private messageService: MessageService, public outils: OutilsService) {
    this.nbVueSubject$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(d => new Observable<number>((observer) => {
      observer.next(d)
    }))
    );
  }

  

  setNbVues(nb: number){
    this.nbVueSubject$.next(nb);
  }

  getAllAbonnes(): Observable<Resultat<Detailblock[]>> {
    return this.httpClient.get<Resultat<Detailblock[]>>(this.abonnesUrl).pipe(
      tap(res => {
        this.log(`Les Abonnés ont été recupérés !`);
        console.log('vrifier le retour du service', res.body);
      }),
      catchError(this.handleError<Resultat<Detailblock[]>>('getAllAbonnes', 
        new Resultat<Detailblock[]>(null, [], [])))
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
  /*
    Rechercher des abonnés par la compétence
  */
   getAbonnesByCompetence(competence: string): Observable<Resultat<Detailblock[]>> {
    return this.httpClient.get<Resultat<Detailblock[]>>(this.rechercheParComptence + competence)
      .pipe(
      tap(res => {
        this.log(`L'abonné a été récupéré !`);
      }),
      catchError(this.handleError<Resultat<Detailblock[]>>('getAbonnesByCompetence'))
    );
  }
  /*
    Rechercher des abonnés par la ville
  */
 getAbonnesByVille(ville: string): Observable<Resultat<Detailblock[]>> {
  return this.httpClient.get<Resultat<Detailblock[]>>(this.rechercheParVille + ville)
    .pipe(
    tap(res => {
      this.log(`L'abonné a été récupéré !`);
    }),
    catchError(this.handleError<Resultat<Detailblock[]>>('getAbonnesByVille'))
  );
}
/*
  Rechercher un abonné par sa competence et sa ville 
*/
 getAbonnesParRecherche(recherche:string, pays:string):Observable<Resultat<Detailblock[]>>{
  return this.httpClient.get<Resultat<Detailblock[]>>(this.rechercheParCompOuVille + recherche + '/' + pays)
      .pipe(
      tap(res => {
        this.log(`L'abonné a été récupéré !`);
      }),
      catchError(this.handleError<Resultat<Detailblock[]>>('getAbonnesParRecherche'))
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

