import {Injectable} from '@angular/core';
import {catchError, map, observeOn, tap, timeout} from 'rxjs/operators';
import {Observable, of, Subject, interval, isObservable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {NotifierService} from 'angular-notifier';
import {isObject} from 'rxjs/internal/util/isObject';
import * as $ from 'jquery';

@Injectable()
export class RegisterService {
  private urlMembre = 'http://localhost:8080/membres/ME';
  private urlPersonne = 'http://localhost:8080/membres';
  private urlLogin = 'http://localhost:8080/login';
  private urlPhoto = 'http://localhost:8080/photo';
  private urlRechercheMens = 'http://localhost:8080/rechePersonneParMc/ME?mc=';
  private urlgetbyLogin = 'http://localhost:8080/membresLogin/';
  public images_u = 'http://localhost:4200/assets/ajax-loader.gif';
  public ajax_loader = '';
  public disabl = false;
  public alert_toget = '';
  public contenu = '';
  public message_traitement: any;
  public InfoMembres: any={};
  private readonly notifier: NotifierService;

  constructor(public  http: HttpClient, public notifierService: NotifierService) {
    this.notifier = notifierService;
    this.notifierService.notify('success', 'You are awesome! I mean it!');
  }

  public urlMembres() {
    return this.urlMembre;
  }

  public urlgetLogin() {
    return this.urlgetbyLogin;
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
              localStorage.setItem('log', dataBody.login);
              const strValue: string = localStorage.getItem('togetToken');
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


  // getByLogin(dataBody: any): any {
    // const strValue: string = localStorage.getItem('togetToken');
    // alert(dataBody);
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // this.http.get<HttpResponse<any>>(this.urlgetbyLogin + dataBody, {
      // headers: headers,
      // observe: 'response'
    // }).subscribe((resul) => {
        // if (resul.status === 200) {
          // this.InfoMembres = resul.body.body;
          // alert(Object.keys(this.InfoMembres));
        // } else {
          // console.log('erreur aucun element trouvé');
        // }
      // },
      // err => {
        // console.log('Error: ' + err);

      // });
  // }
  

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

