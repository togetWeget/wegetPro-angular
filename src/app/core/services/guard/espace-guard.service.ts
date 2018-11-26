import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,CanActivate,Router,RouterStateSnapshot,ParamMap,ActivatedRoute } from '@angular/router';
import { AbonnesService } from '../abonnes/abonnes.service';
import {switchMap, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Detailblock} from '../../../shared/models/detailblock';

@Injectable({
  providedIn: 'root'
})
export class EspaceGuardService implements CanActivate{
	dbk:Detailblock;
	idDbk:number;

  constructor(private abonneService: AbonnesService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
  	//this.idDbk= route.params.id;
  	this.abonneService.getAbonnesByLog(localStorage.getItem('log')).subscribe(resp => {
        this.dbk = resp.body;
     });
  	if(this.dbk!==undefined){
  		return true;
  	}else{
  		this.router.navigate(['paiement/espace']);
  	}
  }

}
