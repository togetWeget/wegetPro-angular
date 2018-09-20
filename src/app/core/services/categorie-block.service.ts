import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Resultat } from '../../shared/models/resultat';
import { CategorieBlock } from '../../shared/models/categorie-block';
import { MessageService } from './message.service';
import { Block } from '../../shared/models/block';

@Injectable({
  providedIn: 'root'
})
export class CategorieBlockService {
public jwtToken: string;
  private urlCategoryBlocks = 'http://wegetback:8080/categoryBlocks';
  private urlCategoryPhotoBlocks = 'http://wegetback:8080/photoCategoryBlock'
  
  

  // observables sources
  private catBlockCreerSource = new Subject<Resultat<CategorieBlock>>();
  private catBlockModifSource = new Subject<Resultat<CategorieBlock>>();
  private catBblockFiltreSource = new Subject<string>();
  private catBlockSupprimeSource = new Subject<Resultat<boolean>>();

// observables streams
  blockCreer$ = this.catBlockCreerSource.asObservable();
  blockModif$ = this.catBlockModifSource.asObservable();
  blockFiltre$ = this.catBblockFiltreSource.asObservable();
  blockSupprime$ = this.catBlockSupprimeSource.asObservable();

  constructor(private http: HttpClient, private messageService: MessageService,
    private toastr: ToastrService) {
  }

  loadToken () {
    this.jwtToken = localStorage.getItem('togetToken');
  }
  getAllCategoryBlocks(): Observable<Resultat<CategorieBlock[]>> {
    return this.http.get<Resultat<CategorieBlock[]>>(this.urlCategoryBlocks)
      .pipe(
        tap(res => {
          this.log(`block recuperes`);
        }),
        catchError(this.handleError<Resultat<CategorieBlock[]>>('getAllCategoryBlocks',
          new Resultat<CategorieBlock[]>(null, [], [])))
      );
  }

  ajoutCategoryBlock(blk: Block): Observable<Resultat<CategorieBlock>> {
    console.log('methode du service qui ajoute un block', blk);
    if (this.jwtToken==null) this.loadToken()
    return this.http.post<Resultat<CategorieBlock>>(this.urlCategoryBlocks, blk,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`block ajouter avec succes : message service=${res.body.libelle}`);
          this.toastr.success('block ajouter avec succes : message service= '+ res.body.libelle,
            'Opération réussie');
          this.blockCreer(res);
          this.filtreblock(res.body.libelle);
        }),
        catchError(this.handleError<Resultat<CategorieBlock>>('ajoutCategoryBlock'))
      );


  }

/*  getCategoryBlockById(id: number): Observable<Resultat<Block>> {

    return this.http.get<Resultat<Block>>(`${this.urlBlocks}/${id}`)
      .pipe(
        tap(res => {
          this.log(`block trouve  id=${id}`);
        }),
        catchError(this.handleError<Resultat<Block>>('getBlockById'))
      );
  }*/

  modifierCategoryBlock(blkModif: Block): Observable<Resultat<CategorieBlock>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.put<Resultat<CategorieBlock>>(this.urlCategoryBlocks, blkModif,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`bloc de libelle  =${res.body.libelle}`);
          this.toastr.success('bloc de libelle  = '+ res.body.libelle,
            'Opération réussie');
          //this.blocktModif(res);
          this.filtreblock(res.body.libelle);

        }),
        catchError(this.handleError<Resultat<CategorieBlock>>('modifierCategoryBlock'))
      );
  }

 /* rechercheCategoryBlockParMc(mc: string): Observable<Array<Block>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.get<Resultat<Array<Block>>>(`${this.urlRechercheBlk}${mc}`,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`block trouve =${res}`))),
        catchError(this.handleError<Array<Block>>('rechercheBlockParMc'))
      );
  }*/
  // supprimer un block
/*  supprimerCategoryBlock(id: number): Observable<Resultat<boolean>> {
    if (this.jwtToken==null) this.loadToken()
    return this.http.delete<Resultat<boolean>>(`${this.urlBlocks}/${id}`,{headers: new  HttpHeaders({'Authorization': this.jwtToken})})
      .pipe(
        tap(res => {
          this.log(`block supprime id =${id}`);
          this.toastr.success('block supprime id = '+ id,
            'Opération réussie');
          this.blocksupprime(res);
        }),
        catchError(this.handleError<Resultat<boolean>>('supprimerBlock'))
      );
  }*/
  enregistrerPhoto(imageFile: File, libelle: string): Observable<any> {
    if (this.jwtToken==null) this.loadToken()
    const formData: FormData = new FormData();
    formData.append('image_photo', imageFile, libelle);
    const req = new HttpRequest('POST', this.urlCategoryPhotoBlocks, formData, {
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
        catchError(this.handleError<Resultat<CategorieBlock>>('enregistrerPhoto'))
      );
  }

  blockCreer(res: Resultat<CategorieBlock>) {
    console.log('block a ete  creer correctement essaie source');
    this.catBlockCreerSource.next(res);
  }

  blocktModif(res: Resultat<CategorieBlock>) {
    this.catBlockModifSource.next(res);
  }

  filtreblock(text: string) {
    this.catBblockFiltreSource.next(text);
  }

  blocksupprime(res: Resultat<boolean>) {
    this.catBlockSupprimeSource.next(res);
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
