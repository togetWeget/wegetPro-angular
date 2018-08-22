import { Injectable } from '@angular/core';
import {Messagerie} from '../../../shared/models/messagerie/messagerie';
import {Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {Resultat} from '../../../shared/models/resultat';
import {Block} from '../../../shared/models/block';
import {MessageService} from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {
  private message: Messagerie [] = [];
  private urlMessagerie = 'http://localhost:8080/messageries';

  messageSubject = new Subject<Messagerie[]>();

  constructor(private httpClient: HttpClient, private router: Router, 
    private messageService: MessageService) { }
  emitMessage() {
    this.messageSubject.next(this.message);
  }
  ajoutMessage(msg: Messagerie): Observable<Resultat<Messagerie>> {
    return this.httpClient.post<Resultat<Messagerie>>(this.urlMessagerie, msg)
      .pipe(
        tap(res => {
          this.log(`messagerie ajouter avec succes : message service=${res.body}`);
          console.log('methode du service qui ajoute un message', msg);
        }),
        catchError(this.handleError<Resultat<Messagerie>>('ajoutMessage'))
      );


  }
  createNewMessage(newMessage: Messagerie) {
    console.log(newMessage);
  }
  private log(message: string) {
    this.messageService.add('blockService: ' + message);

  }

getAllMessagesByAbonneId (id:number): Observable<Resultat<Messagerie[]>>{
   return this.httpClient.get<Resultat<Messagerie[]>>(this.urlMessagerie)
      .pipe(
        tap(res => {
          this.log(`Messages recuperes`);
        }),
        catchError(this.handleError<Resultat<Messagerie[]>>('getAllMessagesByAbonneId', 
          new Resultat<Messagerie[]>(null, [], [])))
      );

}

  ///////////////////////////////////////////
  // recuperer les errurs

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error);


      this.log(`${operation} a rentre un probleme: ${error.message}`);


      return of(result as T);
    };
  }


}
