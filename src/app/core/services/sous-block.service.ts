import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {MessageService} from './message.service';
import {Resultat} from '../../shared/models/resultat';
import {SousBlock} from '../../shared/models/sous-block';
import { ToastrService } from 'ngx-toastr';
import { OutilsService } from './outils.service';

@Injectable({
  providedIn: 'root'
})
export class SousBlockService {
  public jwtToken: string;
  private urlSousBlocks = `${this.outils.getBaseUrl()}/sousBlocks`;
  private urlSousBlocksParBlock = `${this.outils.getBaseUrl()}/SousBlocksParIdBlock`;
  private urlSousBlocksParIdDetailBlock = `${this.outils.getBaseUrl()}/SousBlocksParIdDetailBlock`;
  private urlDetailBlocksParBlock = `${this.outils.getBaseUrl()}/SousBlocksParIdBlock`;
  private urlPhoto = `${this.outils.getBaseUrl()}/photoBlock`;
  private urlPhoto1 = `${this.outils.getBaseUrl()}/getPhoto`;
  private urlRechercheBlk = `${this.outils.getBaseUrl()}/rechercheBlock?mc=`;

  // observables sources
  private blockCreerSource = new Subject<Resultat<SousBlock>>();
  private blockModifSource = new Subject<Resultat<SousBlock>>();
  private blockFiltreSource = new Subject<string>();
  private blockSupprimeSource = new Subject<Resultat<boolean>>();

// observables streams
  blockCreer$ = this.blockCreerSource.asObservable();
  blockModif$ = this.blockModifSource.asObservable();
  blockFiltre$ = this.blockFiltreSource.asObservable();
  blockSupprime$ = this.blockSupprimeSource.asObservable();

  constructor(private http: HttpClient, private messageService: MessageService,
    private toastr: ToastrService, private outils: OutilsService) {
  }

  loadToken () {
    this.jwtToken = localStorage.getItem('togetToken');
  }
  getAllSousBlocks(): Observable<Resultat<SousBlock[]>> {
    return this.http.get<Resultat<SousBlock[]>>(this.urlSousBlocks)
      .pipe(
        tap(res => {
          this.log(`block recuperes`);
        }),
        catchError(this.handleError<Resultat<SousBlock[]>>('getAllSousBlocks',
          new Resultat<SousBlock[]>(null, [], [])))
      );
  }

  ajoutSousBlock(blk: SousBlock): Observable<Resultat<SousBlock>> {
    console.log('methode du service qui ajoute un block', blk);
    if (this.jwtToken==null) this.loadToken()
    return this.http.post<Resultat<SousBlock>>(this.urlSousBlocks, blk,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`block ajouter avec succes : message service=${res.body.nom}`);
          this.toastr.success('block ajouter avec succes : message service= '+ res.body.nom,
            'Opération réussie');
          this.blockCreer(res);
          this.filtreblock(res.body.nom);
        }),
        catchError(this.handleError<Resultat<SousBlock>>('ajoutSousBlock'))
      );


  }

  getSousBlockById(id: number): Observable<Resultat<SousBlock>> {

    return this.http.get<Resultat<SousBlock>>(`${this.urlSousBlocks}/${id}`)
      .pipe(
        tap(res => {
          this.log(`block trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<SousBlock>>('getSousBlockById'))
      );
  }

  getSousBlockByBlock(id: number): Observable<Resultat<SousBlock>> {

    return this.http.get<Resultat<SousBlock>>(`${this.urlSousBlocksParBlock}/${id}`)
      .pipe(
        tap(res => {
          this.log(`block trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<SousBlock>>('getSousBlockByBlock'))
      );
  }

  getSousBlockByIdDetailBlock(id: number): Observable<Resultat<SousBlock>> {

    return this.http.get<Resultat<SousBlock>>(`${this.urlSousBlocksParIdDetailBlock}/${id}`)
      .pipe(
        tap(res => {
          this.log(`block trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<SousBlock>>('getSousBlockByIdDetailBlock'))
      );
  }

 getDetailBlockByBlock(id: number): Observable<Resultat<SousBlock[]>> {

    return this.http.get<Resultat<SousBlock[]>>(`${this.urlDetailBlocksParBlock}/${id}`)
      .pipe(
        tap(res => {
          this.log(`tableau de sousblock trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<SousBlock[]>>('getDetailBlockByBlock',
        new Resultat<SousBlock[]>(null, [], [])))
      );
  }

  modifierSosusBlock(blkModif: SousBlock): Observable<Resultat<SousBlock>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.put<Resultat<SousBlock>>(this.urlSousBlocks, blkModif,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`bloc de nom  =${res.body.nom}`);
          this.toastr.success('bloc de nom  = '+ res.body.nom,
            'Opération réussie');
          //this.blocktModif(res);
          this.filtreblock(res.body.nom);

        }),
        catchError(this.handleError<Resultat<SousBlock>>('modifierSosusBlock'))
      );
  }

  rechercheSousBlockParMc(mc: string): Observable<Array<SousBlock>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.get<Resultat<Array<SousBlock>>>(`${this.urlRechercheBlk}${mc}`,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`block trouve =${res}`))),
        catchError(this.handleError<Array<SousBlock>>('rechercheSousBlockParMc'))
      );
  }
  // supprimer un block
  supprimerSousBlock(id: number): Observable<Resultat<boolean>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.delete<Resultat<boolean>>(`${this.urlSousBlocks}/${id}`,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`block supprime id =${id}`);
          this.toastr.success('block supprime id = '+ id,
            'Opération réussie');
          this.blocksupprime(res);
        }),
        catchError(this.handleError<Resultat<boolean>>('supprimerSousBlock'))
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
           this.filtreEnseignant(event.body.nomComplet);*/
        }),
        catchError(this.handleError<Resultat<SousBlock>>('enregistrerPhoto'))
      );
  }

  blockCreer(res: Resultat<SousBlock>) {
    console.log('block a ete  creer correctement essaie source');
    this.blockCreerSource.next(res);
  }

  blocktModif(res: Resultat<SousBlock>) {
    this.blockModifSource.next(res);
  }

  filtreblock(text: string) {
    this.blockFiltreSource.next(text);
  }

  blocksupprime(res: Resultat<boolean>) {
    this.blockSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('blockService: ' + message);

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
