import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {catchError, map, tap} from 'rxjs/internal/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {MessageService} from '../../message.service';
import {Resultat} from '../../../../shared/models/Resultat';
import {Membres} from '../../../../shared/models/personne/membres/membres';

@Injectable()
export class MembreService {
  private urlMembre = 'http://localhost:8080/personnes/ME';
  private urlPersonne = 'http://localhost:8080/personnes';
  private urlPhoto = 'http://localhost:8080/photo';
  private urlRechercheMens = 'http://localhost:8080/rechePersonneParMc/ME?mc=';

  // observables sources
  private membreCreerSource = new Subject<Resultat<Membres>>();
  private membreModifSource = new Subject<Resultat<Membres>>();
  private membreFiltreSource = new Subject<string>();
  private membreSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  enseignantCreer$ = this.membreCreerSource.asObservable();
  enseignantModif$ = this.membreModifSource.asObservable();
  enseignnantFiltre$ = this.membreFiltreSource.asObservable();
  enseignnantSupprime$ = this.membreSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private  messageService: MessageService) {
  }


  ajoutMembre(mens: Membres): Observable<Resultat<Membres>> {
    console.log('methode du service qui ajoute un enseignant', mens);
    return this.http.post<Resultat<Membres>>(this.urlPersonne, mens)
      .pipe(
        tap(res => {
          this.log(`enseignant ajoute nom et prenom=${res.body._nomComplet}`);

        }),
        catchError(this.handleError<Resultat<Membres>>('ajoutMembre'))
      );


  }

  // obtenir la liste des Membres
  getAllMembre(): Observable<Resultat<Membres[]>> {
    return this.http.get<Resultat<Membres[]>>(this.urlMembre)
      .pipe(
        tap(res => {
          this.log(`enseignants recuperes`);
        }),
        catchError(this.handleError<Resultat<Membres[]>>('getAllEnseignants', new Resultat<Membres[]>(null, [], [])))
      );
  }

  // permet de modifier un membre
  modifierMembre(ensModif: Membres): Observable<Resultat<Membres>> {
    return this.http.put<Resultat<Membres>>(this.urlPersonne, ensModif)
      .pipe(
        tap(res => {
          this.log(`enseignant modifier nom et prenom =${res.body._nomComplet}`);
          this.membretModif(res);
          this.filtreMembre(res.body.nomComplet);
        }),
        catchError(this.handleError<Resultat<Membres>>('modifierMembre'))
      );
  }

  // supprimer un membres
  supprimerMembre(id: number): Observable<Resultat<boolean>> {
    return this.http.delete<Resultat<boolean>>(`${this.urlPersonne}/${id}`)
      .pipe(
        tap(res => {
          this.log(`enseignant supprime id =${id}`);
          this.membresupprime(res);
        }),
        catchError(this.handleError<Resultat<boolean>>('supprimerMembre'))
      );
  }

  getEnseignantById(id: number): Observable<Resultat<Membres>> {
    return this.http.get<Resultat<Membres>>(`${this.urlPersonne}/${id}`)
      .pipe(
        tap(res => {
          this.log(`membres trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<Membres>>('getmembreById'))
      );
  }

  rechercheMembreParMc(mc: string): Observable<Array<Membres>> {
    return this.http.get<Resultat<Array<Membres>>>(`${this.urlRechercheMens}${mc}`)
      .pipe(map(res => res.body,
        tap(res =>
        this.log(` membre trouve =${res}`))),
        catchError(this.handleError<Array<Membres>>('rechercheMembreParMc'))
      );
  }

  private log(message: string) {
    this.messageService.add('membreService: ' + message);

  }

  enregistrerPhoto(imageFile: File, cni: string): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('image_photo', imageFile, cni);
    const req = new HttpRequest('POST', this.urlPhoto, formData, {
      /*reportProgress = true;*/
    });
    return this.http.request(req)
      .pipe(
        tap(event => {
          /* this.log(`photo ajoute nom et prenom =${event.body._nomComplet}`)
           this.enseignantModif(event.type.);
           this.filtreEnseignant(event.body.nomComplet);*/
        }),
        catchError(this.handleError<Resultat<Membres>>('enregistrerPhoto'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error);


      this.log(`${operation} non disponible: ${error.message}`);


      return of(result as T);
    };
  }

  membreCreer(res: Resultat<Membres>) {
    console.log('membre a ete  creer correctement essaie source');
    this.membreCreerSource.next(res);
  }

  membretModif(res: Resultat<Membres>) {
    this.membreModifSource.next(res);
  }

  filtreMembre(text: string) {
    this.membreFiltreSource.next(text);
  }

  membresupprime(res: Resultat<boolean>) {
    this.membreSupprimeSource.next(res);
  }
}
