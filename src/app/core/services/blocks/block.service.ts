import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {catchError, tap, map} from 'rxjs/internal/operators';
import {MessageService} from '../message.service';
import {Resultat} from '../../../shared/models/resultat';
import {Block} from '../../../shared/models/block';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class BlockService {
  /* imagesVibles = [];*/
  private urlBlocks = 'http://localhost:8080/blocks';
  private urlPhoto = 'http://localhost:8080/photo';
  private urlPhoto1 = 'http://localhost:8080/getPhoto';
  private urlRechercheBlk = 'http://localhost:8080/rechercheBlock?mc=';

  // observables sources
  private blockCreerSource = new Subject<Resultat<Block>>();
  private blockModifSource = new Subject<Resultat<Block>>();
  private blockFiltreSource = new Subject<string>();
  private blockSupprimeSource = new Subject<Resultat<boolean>>();

// observables streams
  blockCreer$ = this.blockCreerSource.asObservable();
  blockModif$ = this.blockModifSource.asObservable();
  blockFiltre$ = this.blockFiltreSource.asObservable();
  blockSupprime$ = this.blockSupprimeSource.asObservable();

  constructor(private http: HttpClient, private messageService: MessageService,
    private toastr: ToastrService) {
  }


  getAllBlocks(): Observable<Resultat<Block[]>> {
    return this.http.get<Resultat<Block[]>>(this.urlBlocks)
      .pipe(
        tap(res => {
          this.log(`block recuperes`);
        }),
        catchError(this.handleError<Resultat<Block[]>>('getAllBlocks', 
          new Resultat<Block[]>(null, [], [])))
      );
  }

  ajoutBlock(blk: Block): Observable<Resultat<Block>> {
    console.log('methode du service qui ajoute un block', blk);
    return this.http.post<Resultat<Block>>(this.urlBlocks, blk)
      .pipe(
        tap(res => {
          this.log(`block ajouter avec succes : message service=${res.body.libelle}`);
          this.toastr.success('block ajouter avec succes : message service= '+ res.body.libelle, 
            'Opération réussie');
          this.blockCreer(res);
          this.filtreblock(res.body.libelle);
        }),
        catchError(this.handleError<Resultat<Block>>('ajoutBlock'))
      );


  }

  getBlockById(id: number): Observable<Resultat<Block>> {
    return this.http.get<Resultat<Block>>(`${this.urlBlocks}/${id}`)
      .pipe(
        tap(res => {
          this.log(`block trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<Block>>('getBlockById'))
      );
  }

  modifierBlock(blkModif: Block): Observable<Resultat<Block>> {
    return this.http.put<Resultat<Block>>(this.urlBlocks, blkModif)
      .pipe(
        tap(res => {
          this.log(`bloc de libelle  =${res.body.libelle}`);
          this.toastr.success('bloc de libelle  = '+ res.body.libelle, 
            'Opération réussie');
          //this.blocktModif(res);
          this.filtreblock(res.body.libelle);

        }),
        catchError(this.handleError<Resultat<Block>>('modifierBlock'))
      );
  }

  rechercheBlockParMc(mc: string): Observable<Array<Block>> {
    return this.http.get<Resultat<Array<Block>>>(`${this.urlRechercheBlk}${mc}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`block trouve =${res}`))),
        catchError(this.handleError<Array<Block>>('rechercheBlockParMc'))
      );
  }
  // supprimer un block
  supprimerBlock(id: number): Observable<Resultat<boolean>> {
    return this.http.delete<Resultat<boolean>>(`${this.urlBlocks}/${id}`)
      .pipe(
        tap(res => {
          this.log(`block supprime id =${id}`);
          this.toastr.success('block supprime id = '+ id, 
            'Opération réussie');
          this.blocksupprime(res);
        }),
        catchError(this.handleError<Resultat<boolean>>('supprimerBlock'))
      );
  }
  enregistrerPhoto(imageFile: File, libelle: string): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('image_photo', imageFile, libelle);
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
        catchError(this.handleError<Resultat<Block>>('enregistrerPhoto'))
      );
  }

  blockCreer(res: Resultat<Block>) {
    console.log('block a ete  creer correctement essaie source');
    this.blockCreerSource.next(res);
  }

  blocktModif(res: Resultat<Block>) {
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

      this.toastr.error(operation + ' a rentre un probleme: ' + error.message, 'Erreur');
      console.error(error);


      this.log(`${operation} a rentre un probleme: ${error.message}`);


      return of(result as T);
    };
  }


}

