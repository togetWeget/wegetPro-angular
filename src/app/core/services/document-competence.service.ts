import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {MessageService} from './message.service';
import {Resultat} from '../../shared/models/resultat';
import {DocumentCompetence} from '../../shared/models/document-competence';
import { ToastrService } from 'ngx-toastr';
import { OutilsService } from './outils.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentCompetenceService {
	public jwtToken: string;
  private urlDocumentCompetences = `${this.outils.getBaseUrl()}/documentCompetence`;
  private urlDocumentCompetences2 = `${this.outils.getBaseUrl()}/documentCompetence`;
  private urlPhoto = `${this.outils.getBaseUrl()}/photoBlock`;
  private urlPhoto1 = `${this.outils.getBaseUrl()}/getPhoto`;
  private urlRechercheBlk = `${this.outils.getBaseUrl()}/rechercheBlock?mc=`;


  constructor(private http: HttpClient, private messageService: MessageService,
    private toastr: ToastrService, private outils: OutilsService) {
  }

  loadToken () {
    this.jwtToken = localStorage.getItem('togetToken');
  }
  getAllDocumentCompetences(): Observable<Resultat<DocumentCompetence[]>> {
    return this.http.get<Resultat<DocumentCompetence[]>>(this.urlDocumentCompetences)
      .pipe(
        tap(res => {
          this.log(`block recuperes`);
        }),
        catchError(this.handleError<Resultat<DocumentCompetence[]>>('getAllDocumentCompetences',
          new Resultat<DocumentCompetence[]>(null, [], [])))
      );
  }
  getAllDocumentCompetencesParPersonne(idPersonne: number): Observable<Resultat<DocumentCompetence[]>> {
    return this.http.get<Resultat<DocumentCompetence[]>>(`${this.urlDocumentCompetences}/${idPersonne}`)
      .pipe(
        tap(res => {
          this.log(`block recuperes`);
        }),
        catchError(this.handleError<Resultat<DocumentCompetence[]>>('getAllDocumentCompetencesParPersonne',
          new Resultat<DocumentCompetence[]>(null, [], [])))
      );
  }

  ajoutDocumentCompetence(blk: DocumentCompetence): Observable<Resultat<DocumentCompetence>> {
    console.log('methode du service qui ajoute un block', blk);
    if (this.jwtToken==null) this.loadToken()
    return this.http.post<Resultat<DocumentCompetence>>(this.urlDocumentCompetences, blk,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`document ajouté avec succes : message service=${res.body}`);
          this.toastr.success('document ajouteé avec succes : message service= '+ res.body,
            'Opération réussie');
        }),
        catchError(this.handleError<Resultat<DocumentCompetence>>('ajoutDocumentCompetence'))
      );
  }

  modifierDocumentCompetence(blk: DocumentCompetence): Observable<Resultat<DocumentCompetence>> {
    console.log('methode du service qui ajoute un block', blk);
    if (this.jwtToken==null) this.loadToken()
    return this.http.put<Resultat<DocumentCompetence>>(this.urlDocumentCompetences, blk,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`document ajouté avec succes : message service=${res.body}`);
          this.toastr.success('document ajouteé avec succes : message service= '+ res.body,
            'Opération réussie');
        }),
        catchError(this.handleError<Resultat<DocumentCompetence>>('ajoutDocumentCompetence'))
      );
  }

  getDocumentCompetenceById(id: number): Observable<Resultat<DocumentCompetence>> {

    return this.http.get<Resultat<DocumentCompetence>>(`${this.urlDocumentCompetences}/${id}`)
      .pipe(
        tap(res => {
          this.log(`block trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<DocumentCompetence>>('getDocumentCompetenceById'))
      );
  }

  // supprimer un block
  supprimerDocumentCompetence(id: number): Observable<Resultat<boolean>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.delete<Resultat<boolean>>(`${this.urlDocumentCompetences}/${id}`,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`block supprime id =${id}`);
          this.toastr.success('block supprime id = '+ id,
            'Opération réussie');
        }),
        catchError(this.handleError<Resultat<boolean>>('supprimerDocumentCompetence'))
      );
  }
  enregistrerPhoto(imageFile: File, nom: string): Observable<any> {
    if (this.jwtToken==null) this.loadToken()
    const formData: FormData = new FormData();
    formData.append('image_photo', imageFile, nom);
    const req = new HttpRequest('POST', this.urlPhoto, formData, {
      /*reportProgress = true;*/
    });
    return this.http.request(req)
      .pipe(
        tap(event => {
          this.toastr.success('Image ajouté avec succès',
            'Opération réussie');
          /* this.log(`photo ajoute nom et prenom =${event.body._nomComplet}`)
           this.enseignantModif(event.type.);
           this.filtreEnseignant(event.bodyComplet);*/
        }),
        catchError(this.handleError<Resultat<DocumentCompetence>>('enregistrerPhoto'))
      );
  }

  private log(message: string) {
    this.messageService.add('blockService: ' + message);

  }

  ///////////////////////////////////////////
  // recuperer les errurs

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // this.toastr.error(operation + ' a rencontre un probleme: ' + error.message, 'Erreur');
      console.error(error);


      this.log(`${operation} a rentre un probleme: ${error.message}`);


      return of(result as T);
    };
  }

}
