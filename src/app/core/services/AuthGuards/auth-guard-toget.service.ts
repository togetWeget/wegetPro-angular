import {Injectable} from '@angular/core';
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
  constructor(private route: ActivatedRoute, public router: Router, public http: HttpClient) {
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
							console.log(position.coords.latitude);
							console.log(position.coords.longitude);
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
	$.getJSON("http://ip-api.com/json",(json)=> {
		u.publicIp = json.query;
		if(u.lat == 0 && u.lon == 0){
			u.lat = json.lat;
			u.lon = json.lon;
			
		console.log(u.lat);	
        console.log(u.lon);	
        console.log(u.publicIp);	
		}
		if (u.isLoggedIn()) {
		let data: any = {lon: '',lat: '', id:''};
			u.getmembre();
        }
      });	
		
	}
	
	getmembre(){
	const log = localStorage.getItem('log');
	if(log){
		let u = this;
				$.getJSON("http://wegetback:8080/profilAbonneLogin/"+log,(json)=>{
					u.dataMembre = json.body[0].membre;
					console.log('ddd'+u.dataMembre);
				});	
		

		console.log(this.dataMembre);
			if(this.dataMembre){
				
			}else{
								u.callback();
			}
			
			
	
		
	}else{
	
	}

	}
	callback(){
		
	this.getmembre();	
	}
	sendLocalInfo(para){
		$.ajax({
			url: '',
			data: JSON.stringify(para),
			type: 'post',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			cache: false,
			success: function (data,status) {
				console.log(status);
				console.log(data);
			},
			error: function (xhr) {
				console.log(xhr);
			}
		});	
	}
	
 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		this.geolocNav();
		this.getLocalUsers();	
		

    console.log(' verification ...' + route.url);
    const urlcurrent = String(route.url);
    const urlAdmin: any = 'admin';
    console.log(' verification ...' + urlcurrent);
    const urllogin: any = 'login';
    const urlregister: any = 'register';
		console.log(this.isLoggedIn());
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
		
		if(jwt.sub == log){
			if(dateExp < dateNow){
				return false;			
			}else{
				return true;
			}
		}else{
			return false;
		}
	}else{
	return false;
	}
  }

}

