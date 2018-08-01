import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {catchError, map, tap} from 'rxjs/internal/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {MessageService} from '../../message.service';
import {Resultat} from '../../../../shared/models/resultat';
import {Membre} from '../../../../shared/models/personne/membres/membre';

@Injectable()
export class MembreService {
  private urlMembre = 'http://localhost:8080/personnes/ME';
  private urlPersonne = 'http://localhost:8080/personnes';
  private urlPhoto = 'http://localhost:8080/photo';
  private urlRechercheMens = 'http://localhost:8080/rechePersonneParMc/ME?mc=';

  // observables sources
  private membreCreerSource = new Subject<Resultat<Membre>>();
  private membreModifSource = new Subject<Resultat<Membre>>();
  private membreFiltreSource = new Subject<string>();
  private membreSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  enseignantCreer$ = this.membreCreerSource.asObservable();
  enseignantModif$ = this.membreModifSource.asObservable();
  enseignnantFiltre$ = this.membreFiltreSource.asObservable();
  enseignnantSupprime$ = this.membreSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private  messageService: MessageService) {
  }


  ajoutMembre(mens: Membre): Observable<Resultat<Membre>> {
    console.log('methode du service qui ajoute un enseignant', mens);
    return this.http.post<Resultat<Membre>>(this.urlPersonne, mens)
      .pipe(
        tap(res => {
          this.log(`enseignant ajoute nom et prenom=${res.body.nomComplet}`);

        }),
        catchError(this.handleError<Resultat<Membre>>('ajoutMembre'))
      );


  }

  // obtenir la liste des Membre
  getAllMembre(): Observable<Resultat<Membre[]>> {
    return this.http.get<Resultat<Membre[]>>(this.urlMembre)
      .pipe(
        tap(res => {
          this.log(`enseignants recuperes`);
        }),
        catchError(this.handleError<Resultat<Membre[]>>('getAllEnseignants', new Resultat<Membre[]>(null, [], [])))
      );
  }

  // permet de modifier un membre
  modifierMembre(ensModif: Membre): Observable<Resultat<Membre>> {
    return this.http.put<Resultat<Membre>>(this.urlPersonne, ensModif)
      .pipe(
        tap(res => {
          this.log(`enseignant modifier nom et prenom =${res.body.nomComplet}`);
          this.membretModif(res);
          this.filtreMembre(res.body.nomComplet);
        }),
        catchError(this.handleError<Resultat<Membre>>('modifierMembre'))
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

  getEnseignantById(id: number): Observable<Resultat<Membre>> {
    return this.http.get<Resultat<Membre>>(`${this.urlPersonne}/${id}`)
      .pipe(
        tap(res => {
          this.log(`membres trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<Membre>>('getmembreById'))
      );
  }

  rechercheMembreParMc(mc: string): Observable<Array<Membre>> {
    return this.http.get<Resultat<Array<Membre>>>(`${this.urlRechercheMens}${mc}`)
      .pipe(map(res => res.body,
        tap(res =>
        this.log(` membre trouve =${res}`))),
        catchError(this.handleError<Array<Membre>>('rechercheMembreParMc'))
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
        catchError(this.handleError<Resultat<Membre>>('enregistrerPhoto'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error);


      this.log(`${operation} non disponible: ${error.message}`);


      return of(result as T);
    };
  }

  membreCreer(res: Resultat<Membre>) {
    console.log('membre a ete  creer correctement essaie source');
    this.membreCreerSource.next(res);
  }

  membretModif(res: Resultat<Membre>) {
    this.membreModifSource.next(res);
  }

  filtreMembre(text: string) {
    this.membreFiltreSource.next(text);
  }

  membresupprime(res: Resultat<boolean>) {
    this.membreSupprimeSource.next(res);
  }
}
