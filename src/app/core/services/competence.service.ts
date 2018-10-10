import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {Resultat} from '../../shared/models/resultat';
import {OutilsService} from './outils.service';
import {CursusScolaire} from '../../shared/models/personne/cv-personne/cursusScolaire';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {
	private abonneCvFormationUrl =`${this.outils.getBaseUrl()}/cursus/`;
  private abonneCvExperienceUrl = `${this.outils.getBaseUrl()}/experience/`;
  private jwtToken: string = null;

  constructor(private httpClient:HttpClient,
              private messageService:MessageService, private outils: OutilsService) { }

  ajouterFormation(cursus: CursusScolaire): Observable<Resultat<CursusScolaire>> {
    console.log('methode du service qui ajoute un enseignant', cursus);
    return this.httpClient.post<Resultat<CursusScolaire>>(this.abonneCvFormationUrl, cursus)
      .pipe(
        tap(res => {
          let msg = `enseignant ajoute nom et prenom`;
          this.log(msg);
        }),
        catchError(this.handleError<Resultat<CursusScolaire>>('ajouterFormation'))
      );
  }
  getAllFormationByAbonneId(id: number): Observable<Resultat<CursusScolaire[]>> {
    return this.httpClient.get<Resultat<CursusScolaire[]>>(this.abonneCvFormationUrl + id).pipe(
      tap(res => {
        this.log(`Les Abonnés ont été recupérés !`);
        console.log('vrifier le retour du service', res.body);
      }),
      catchError(this.handleError<Resultat<CursusScolaire[]>>('getAllFormationByAbonneId', 
        new Resultat<CursusScolaire[]>(null, [], [])))
    );
  }
  // permet de modifier la liste 
    ajouterCursusScolaire(cursusScolaire: CursusScolaire[]): Observable<Resultat<CursusScolaire[]>> {
    if(this.jwtToken === null){
      this.loadToken();
    }      
    return this.httpClient.post<Resultat<CursusScolaire[]>>(this.abonneCvFormationUrl, cursusScolaire, 
      {headers: new HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          let msg = `membre ajouter nom et prenom `;
          this.log(msg);
        }),
        catchError(this.handleError<Resultat<CursusScolaire[]>>('modifierCursusScolaire'))
      );
  }
  // permet de modifier la liste 
  modifierCursusScolaire(cursusScolaire: CursusScolaire): Observable<Resultat<CursusScolaire>> {
    if(this.jwtToken === null){
      this.loadToken();
    }      
    return this.httpClient.put<Resultat<CursusScolaire>>(this.abonneCvFormationUrl, cursusScolaire, 
      {headers: new HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          let msg = `membre modifier nom et prenom `;
          this.log(msg);
        }),
        catchError(this.handleError<Resultat<CursusScolaire>>('modifierCursusScolaire'))
      );
  }
  loadToken() {
    this.jwtToken = localStorage.getItem('togetToken');
  }
  private log(message: string) {
    this.messageService.add('membreService: ' + message);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} non disponible: ${error.message}`);
      return of(result as T);
    };
  }
}
