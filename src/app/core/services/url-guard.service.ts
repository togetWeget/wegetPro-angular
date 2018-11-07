import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,CanActivate,Router,RouterStateSnapshot,ParamMap,ActivatedRoute } from '@angular/router';
import { AbonnesService } from './abonnes/abonnes.service';
import {switchMap, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Detailblock} from '../../shared/models/detailblock';

@Injectable({
  providedIn: 'root'
})
export class UrlGuardService implements CanActivate{
	dbk:Detailblock
	idDbk:number=0;

  constructor(private abonneService: AbonnesService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
  	this.idDbk= route.params.id;
    console.log(this.idDbk);
  	this.abonneService.getProfilById(this.idDbk).subscribe(resp => {
        this.dbk = resp.body;
				console.log(this.dbk);
		 });
		 if(this.dbk!=null){
			return true;
		}else{
			this.router.navigate(['notFound']);
		}
  }
  
}
