import {Injectable} from '@angular/core';
import {InfoMembreService} from '../info-membre/info-membre.service';
import {
  ActivatedRoute,
  CanActivate,
  CanLoad,
  CanActivateChild,
  Router,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlSegment, UrlTree
} from '@angular/router';
import {Url} from 'url';
import {equal} from 'assert';
import {HttpClient, HttpRequest, HttpResponse, HttpHeaders} from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import * as $ from 'jquery';
import {} from '@types/googlemaps';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {RequestChatroomService} from "../Request-Chatroom/request-chatroom.service";
import { AuthFirebaseService} from '../../../firebaseDir/auth-firebase.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardTogetService implements CanActivate, CanActivateChild, CanLoad {
	// const mapRef: google.maps.Map;
	// const bounds: google.maps.LatLngBounds;
	// const latLng: google.maps.LatLng;
	
	private lat: any;
	private lon: any;
	private publicIp: any;
public dataMembre: any = [];
  constructor(private route: ActivatedRoute, public router: Router, public http: HttpClient, private InfoM: InfoMembreService, public chatrequest: RequestChatroomService, private firebaseDir: AuthFirebaseService) {
	  this.InfoM.getbylogin();
  }

  canLoad (route: Route) {
    let url = `/${route.path}`;
    return this.isLoggedIn();
  }

  canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
// IP Number = A x (256*256*256) + B x (256*256) + C x 256 + D calcul detection et localisation adresse ip
	geolocNav(){
		let u = this;
		u.lat =  0;
		u.lon = 0;
		if (window.isSecureContext) {
		  navigator.serviceWorker.register("/offline-worker.js").then(function () {
			   if (window.navigator.geolocation) {
				  window.navigator.geolocation.watchPosition(
					(position) => {
							u.lat = position.coords.latitude;
							u.lon = position.coords.longitude;
					});
			    }else{
				}
		  });
		}else{
		}

	}
	
	getLocalUsers(){
	 let u = this;
		u.InfoM.getbylogin();
	$.getJSON("http://ip-api.com/json",(json)=> {
		u.publicIp = json.query;
		if(u.lat == 0 && u.lon == 0){
			u.lat = json.lat;
			u.lon = json.lon;
		}
		if (u.isLoggedIn() && u.InfoM.InfoMembres) {
		let data: any = {longitude: u.lon,latitude: u.lat, membre: u.InfoM.InfoMembres.id, ipConnexion: u.publicIp, dateupd: new Date().toLocaleString()};
			u.sendLocalInfo(data, u.InfoM.InfoMembres.id);
        }
      });	
		
	}
	
	splitF(param: any): any{
		let reg = /./gi
		let sp = param.replace(reg, '-');
		return sp;		
		}
		
	sendLocalInfo(para,idMembre){
	let u = this;
	u.InfoM.getbylogin();
	let urlgeo = "Geolocalisation/" + idMembre;
		let reg = /./gi
	let curLon =u.lon.toString().split('.');
	let curLat =u.lat.toString().split('.');
	let urizFormat = curLon[0] + curLon[1] + curLat[0] + curLat[1];
	let urlgeoDeplacement = "Deplacement/" + idMembre + "/" + urizFormat;
	let donnee : any = {latitude: u.lat, longitude: u.lon};
	this.chatrequest.CreateSendData(urlgeo, para);
	this.chatrequest.CreateSendData(urlgeoDeplacement, para);
	}
	
 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		this.InfoM.getbylogin();
		this.geolocNav();
		this.getLocalUsers();	
		
	// console.log(this.InfoM.InfoMembres.id);
    // console.log(' verification ...' + route.url);
    const urlcurrent = String(route.url);
    const urlAdmin: any = 'admin';
    // console.log(' verification ...' + urlcurrent);
    const urllogin: any = 'login';
    const urlregister: any = 'register';
		// console.log(this.isLoggedIn());
    switch (urlcurrent) {
      case urlAdmin :

        if (this.isLoggedIn()) {
          return true;
        } else {
          this.router.navigate(['/site/login']);
        }

        break;

      case urllogin:
        if (this.isLoggedIn()) {
          this.router.navigate(['/admin']);
        } else {
          return true;
        }
        break;

      case urlregister :
        if (this.isLoggedIn()) {
          this.router.navigate(['/admin']);
        } else {
          return true;
        }
        break;

      default :
        return true;

    }


  }


  private isLoggedIn(): boolean {
	return this.getToken();
  }

  getToken(): boolean {
	const localStorange = localStorage.getItem('togetToken');
	const log = localStorage.getItem('log');
	if(localStorange && log){
		let jwt = jwt_decode(localStorange);
		let dateNow = new Date().getTime();
		let dateExp = jwt.exp * 1000;
		let ddd=  new Date(dateExp).toLocaleString();
		// console.log(ddd);
		if(jwt.sub == log){
			if(dateExp < dateNow){
				this.claering();
				return false;	
			}else{
				return true;
			}
		}else{
			this.claering();
			return false;
		}
	}else{
	this.claering();
	return false;
	
	}
  }
  
  
  claering(){
	  localStorage.clear();
      this.firebaseDir.signOutUser();	  
	  }

}

