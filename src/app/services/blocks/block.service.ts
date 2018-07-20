import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Block} from '../../models/Block.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {catchError, tap} from 'rxjs/internal/operators';
import {MessageService} from '../message.service';
import {Resultat} from '../../models/Resultat';

@Injectable({
  providedIn: 'root'
})
export class BlockService {
  private blockDataUrl = 'http://localhost:8080/blocks';
  private urlPhoto = 'http://localhost:8080/photo';
  private urlPhoto1 = 'http://localhost:8080/getPhoto';
  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  getAllBlocks(): Observable<Resultat<Block[]>> {
    return this.httpClient.get<Resultat<Block[]>>(this.blockDataUrl)
      .pipe(
        tap(res => {
          this.log(`Les Blocks ont été recupérés !`);
        }),
          catchError(this.handleError<Resultat<Block[]>>('getAllBlocks', new Resultat<Block[]>(null, [], [])))
    );
  }
  enregistrerPhoto(imageFile: File, libelle: string): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('image_photo', imageFile, libelle);
    const req = new HttpRequest('POST', this.urlPhoto, formData, {
      /*reportProgress = true;*/
    });
    return this.httpClient.request(req)
      .pipe(
        tap(event => {
          /* this.log(`photo ajoute nom et prenom =${event.body._nomComplet}`)
           this.enseignantModif(event.type.);
           this.filtreEnseignant(event.body.nomComplet);*/
        }),
        catchError(this.handleError<Resultat<Block>>('enregistrerPhoto'))
      );
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

