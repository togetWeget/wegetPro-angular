import { Injectable } from '@angular/core';
import {catchError, map, observeOn, tap, timeout} from 'rxjs/internal/operators';
import {Observable, of, Subject, interval, isObservable} from 'rxjs';
import {HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import {isObject} from 'rxjs/internal/util/isObject';


@Injectable()
export class RegisterService {
  private urlMembre = 'http://localhost:8080/personnes/ME';
  private urlPersonne = 'http://localhost:8080/personnes';
  private urlLogin = 'http://localhost:8080/login';
  private urlPhoto = 'http://localhost:8080/photo';
  private urlRechercheMens = 'http://localhost:8080/rechePersonneParMc/ME?mc=';
  public images_u = 'http://localhost:4200//assets/ajax-loader.gif';
  public ajax_loader = '';
  public disabl = false;
  public alert_toget = '';
  public contenu = '';
  public message_traitement: any;
  private readonly notifier: NotifierService;
  constructor(public  http: HttpClient, public notifierService: NotifierService) {
    this.notifier = notifierService;
    this.notifierService.notify( 'success', 'You are awesome! I mean it!' );
  }
  public urlMembres() {
    return this.urlMembre;
  }

  public urlPersonnes() {
    return this.urlPersonne;
  }

  public urlLogins() {
    return this.urlLogin;
  }

  public urlPhotos() {
    return this.urlPhoto;
  }

  public urlRechercheMenss() {
    return this.urlRechercheMens;
  }
registering(urlsender: any, dataBody: any = {}): any {
 this.disabl = true;
 const u = this;
    this.ajax_loader = this.images_u;
     return this.http.post(urlsender, dataBody)
        .subscribe(
          (res: any) => {
            console.log(res);
            u.ajax_loader = '';
            u.disabl = false;
            u.message_traitement = 1;
            if (res) {
              if (res.statut === 0) {
                localStorage.setItem('togetToken', 'azerty');
                const strValue: string = localStorage.getItem('togetToken');
                alert(strValue);
              }
              alert(res.messages[0]);
            }
          },
          err => {
            console.log('Error !' + err);
            u.message_traitement = 0;
            alert('erreur! veuillez reessayer');
            u.ajax_loader = '';
            u.disabl = false;

          }
        );
     }


 alerted_one(cont: any) {


/*this.alert_toget = 'alert_toget';
this.contenu = cont;
clearTimeout(this.timer);
this.timer = setTimeout(() => {
this.retour_on();
}, 2000);*/
  }

  retour_on() {
    this.contenu = '';
    this.alert_toget = 'alert_toget_hide';

  }

}

