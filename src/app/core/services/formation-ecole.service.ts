import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {MessageService} from './message.service';
import {Resultat} from '../../shared/models/resultat';
import {Formation} from '../../shared/models/ecole/formation';
import { ToastrService } from 'ngx-toastr';
import { OutilsService } from './outils.service';

@Injectable({
  providedIn: 'root'
})
export class FormationEcoleService {
	public jwtToken: string;
	private urlFormations = `${this.outils.getBaseUrl()}/formations`;
	private urlFormationsParSousBlock = `${this.outils.getBaseUrl()}/formationSousBlock`;

	 // observables sources
	// private FormationCreerSource = new Subject<Resultat<Formation>>();
	// private FormationModifSource = new Subject<Resultat<Formation>>();
	// private FormationFiltreSource = new Subject<string>();
	// private FormationSupprimeSource = new Subject<Resultat<boolean>>();

  constructor(private http: HttpClient, private messageService: MessageService,
    private toastr: ToastrService, private outils: OutilsService) { }

  loadToken () {
    this.jwtToken = localStorage.getItem('togetToken');
  }

  getAllFormations(): Observable<Resultat<Formation[]>> {
    return this.http.get<Resultat<Formation[]>>(this.urlFormations)
      .pipe(
        tap(res => {
          this.log(`Formation recuperes`);
        }),
        catchError(this.handleError<Resultat<Formation[]>>('getAllFormations',
          new Resultat<Formation[]>(null, [], [])))
      );
  }

  ajoutFormation(blk: Formation): Observable<Resultat<Formation>> {
    console.log('methode du service qui ajoute un Formation', blk);
    if (this.jwtToken==null) this.loadToken();
    return this.http.post<Resultat<Formation>>(this.urlFormations, blk,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`Formation ajouter avec succes : message service=${res.body.contenu}`);
          this.toastr.success('Formation ajouter avec succes : message service= '+ res.body.contenu,
            'Opération réussie');
          // this.FormationCreer(res);
          // this.filtreFormation(res.body.nom);
        }),
        catchError(this.handleError<Resultat<Formation>>('ajoutFormation'))
      );


  }

  getFormationById(id: number): Observable<Resultat<Formation>> {

    return this.http.get<Resultat<Formation>>(`${this.urlFormations}/${id}`)
      .pipe(
        tap(res => {
          this.log(`Formation trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<Formation>>('getFormationById'))
      );
  }

  getFormationBySousBlock(id: number): Observable<Resultat<Formation>> {

    return this.http.get<Resultat<Formation>>(`${this.urlFormationsParSousBlock}/${id}`)
      .pipe(
        tap(res => {
          this.log(`Formation trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<Formation>>('getFormationById'))
      );
  }

  modifierFormation(blkModif: Formation): Observable<Resultat<Formation>> {
    if (this.jwtToken==null) this.loadToken();
    return this.http.put<Resultat<Formation>>(this.urlFormations, blkModif,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`bloc de nom  =${res.body.contenu}`);
          this.toastr.success('bloc de nom  = '+ res.body.contenu,
            'Opération réussie');
          //this.FormationtModif(res);
          // this.filtreFormation(res.body.nom);

        }),
        catchError(this.handleError<Resultat<Formation>>('modifierFormation'))
      );
  }

  // supprimer un Formation
  supprimerFormation(id: number): Observable<Resultat<boolean>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.delete<Resultat<boolean>>(`${this.urlFormations}/${id}`,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`Formation supprime id =${id}`);
          this.toastr.success('Formation supprime id = '+ id,
            'Opération réussie');
          // this.Formationsupprime(res);
        }),
        catchError(this.handleError<Resultat<boolean>>('supprimerFormation'))
      );
  }

  private log(message: string) {
    this.messageService.add('FormationService: ' + message);

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
