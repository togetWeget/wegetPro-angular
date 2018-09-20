import { Injectable } from '@angular/core';
import {Messagerie} from '../../../shared/models/messagerie/messagerie';
import {Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, debounceTime, distinctUntilChanged,
switchMap, tap} from 'rxjs/operators';
import {Resultat} from '../../../shared/models/resultat';
import {Block} from '../../../shared/models/block';
import {MessageService} from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {
  private message: Messagerie [] = [];
  private urlMessagerie = 'http://wegetback:8080/messageries/';
  private urlMessagerierep = 'http://wegetback:8080/envoiemessages/';
  private urlMessages = 'http://wegetback:8080/messages/';
  private urlMessage='http://wegetback:8080/message/';

  messageSubject = new Subject<Messagerie[]>();
  nonLusSubject$ = new Subject<number>(0);
  // nonLu$: Observable<number>;

  constructor(private httpClient: HttpClient, private router: Router, 
    private messageService: MessageService) {
    this.nonLusSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(d => new Observable((observer)=>{
        observer.next(d);
      }))
    );
  }

  setNonLu(nl: number){
    this.nonLusSubject$.next(nl);
  }

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

   repondreMessage(msg: Messagerie): Observable<Resultat<Messagerie>> {
    return this.httpClient.post<Resultat<Messagerie>>(this.urlMessagerierep, msg)
      .pipe(
        tap(res => {
          this.log(`messagerie ajouter avec succes : message service=${res.body}`);
          console.log('methode du service qui ajoute un message', msg);
        }),
        catchError(this.handleError<Resultat<Messagerie>>('ajoutMessage'))
      );


  }

  changeStatusMessage(msg: Messagerie): Observable<Resultat<Messagerie>> {
    return this.httpClient.put<Resultat<Messagerie>>(this.urlMessages, msg)
      .pipe(
        tap(res => {
          this.log(`messagerie lu : message service=${res.body}`);
          console.log('methode du service qui change le status d\'un message', msg);
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
   return this.httpClient.get<Resultat<Messagerie[]>>(this.urlMessagerie+id)
      .pipe(
        tap(res => {
          this.log(`Messages recuperes`);
        }),
        catchError(this.handleError<Resultat<Messagerie[]>>('getAllMessagesByAbonneId', 
          new Resultat<Messagerie[]>(null, [], [])))
      );

}
getMessageById(id:number):Observable<Resultat<Messagerie>>{
  return this.httpClient.get<Resultat<Messagerie>>(this.urlMessage+id).pipe(
    tap(res=>{
      this.log(`Le message est récuperé`);
    }),
    catchError(this.handleError<Resultat<Messagerie>>('getMessageById'))
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