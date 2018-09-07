import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {catchError, map, tap, debounceTime, 
  distinctUntilChanged, switchMap} from 'rxjs/operators';
import {HttpClient, HttpRequest, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../../message.service';
import {Resultat} from '../../../../shared/models/resultat';
import {Membre} from '../../../../shared/models/personne/membres/membre';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MembreService {
  private urlMembre = 'http://wegetback:8080/personnes/ME';
  private urlModifMembre = 'http://wegetback:8080/membres';
  private urlMembreByLogin = 'http://wegetback:8080/membresLogin';
  private urlPersonne = 'http://wegetback:8080/personnes';
  private urlPhoto = 'http://wegetback:8080/photo';
  private urlPhotoMembre = 'http://wegetback:8080/photoMembre';
  private urlPhotoCouvertureMembre = 'http://wegetback:8080/photoCouvertureMembre';
  private urlRechercheMens = 'http://wegetback:8080/rechePersonneParMc/ME?mc=';

  //other vars
  private jwtToken: string = null;

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

  constructor(private  http: HttpClient, private  messageService: MessageService,
    private toastr: ToastrService) {
  }


  ajoutMembre(mens: Membre): Observable<Resultat<Membre>> {
    console.log('methode du service qui ajoute un enseignant', mens);
    return this.http.post<Resultat<Membre>>(this.urlPersonne, mens)
      .pipe(
        tap(res => {
          let msg = `enseignant ajoute nom et prenom=${res.body.nomComplet}`;
          this.log(msg);
          this.toastr.success(msg,'Opération réussie');
        }),
        catchError(this.handleError<Resultat<Membre>>('ajoutMembre'))
      );


  }

  // obtenir la liste des Membres
  getAllMembre(): Observable<Resultat<Membre[]>> {
    return this.http.get<Resultat<Membre[]>>(this.urlMembre)
      .pipe(
        tap(res => {
          this.log(`enseignants recuperes`);          
        }),
        catchError(this.handleError<Resultat<Membre[]>>('getAllEnseignants',
         new Resultat<Membre[]>(null, [], [])))
      );
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('togetToken');
  }

  // permet de modifier un membre
  modifierMembre(ensModif: Membre): Observable<Resultat<Membre>> {
    if(this.jwtToken === null){
      this.loadToken();
    }      
    return this.http.put<Resultat<Membre>>(this.urlModifMembre, ensModif, 
      {headers: new HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          let msg = `membre modifier nom et prenom =${res.body.nomComplet}`;
          this.log(msg);
          this.toastr.success(msg,'Opération réussie');
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
          let msg = `enseignant supprime id =${id}`;
          this.log(msg);
          this.toastr.success(msg,'Opération réussie');
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

  getMembreByLogin(login: string): Observable<Resultat<Membre>> {
    return this.http.get<Resultat<Membre>>(`${this.urlMembreByLogin}/${login}`)
      .pipe(       
        tap(res => {
          this.log(`membre trouve  login=${login}`);
        }),
        catchError(this.handleError<Resultat<Membre>>('getmembreByLogin'))
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

  enregistrerPhoto(imageFile: File, login: string): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('image_photo', imageFile, login);
    const req = new HttpRequest('POST', this.urlPhotoMembre, formData, {
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
 enregistrerPhotoCouverture(imageFile: File, login: string): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('image_photo', imageFile, login);
    const req = new HttpRequest('POST', this.urlPhotoCouvertureMembre, formData, {
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
