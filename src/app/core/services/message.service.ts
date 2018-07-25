import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageSource = new Subject<String>();
  message$ = this.messageSource.asObservable();

  constructor() {
  }


  add(message: string) {
    /*this.messages.push(message);*/
    this.messageSource.next(message);
  }

}
