import { Component, OnInit } from '@angular/core';
import {Tarif} from '../../../shared/models/tarif/tarif';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AbonnementService} from '../../../core/services/abonnements/abonnement.service';
import {switchMap} from 'rxjs/operators';
import {PanierService} from '../../../core/services/panier.service';
import {InfoMembreService} from '../../../core/services/info-membre/info-membre.service';
import {isObject} from 'rxjs/internal/util/isObject';
import * as $ from 'jquery';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../../../core/clients/login/login.component';
@Component({
  selector: 'app-prix',
  templateUrl: './prix.component.html',
  styleUrls: ['./prix.component.scss']
})
export class PrixComponent implements OnInit {

  tarifs: Tarif[] = [];
  tarifselected: Tarif;
  public idBlock: any;
  public stor = localStorage.getItem('togetToken');
	public storlog = localStorage.getItem('log');
  constructor(private route: ActivatedRoute, private router: Router, 
    private abonnementServices: AbonnementService, public panier: PanierService, public infoM: InfoMembreService, private dialog: MatDialog) { 
		this.infoM.getbylogin();
	}

  ngOnInit() {
    this.featchTarif();
  }
  featchTarif() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.abonnementServices.getAlltarifsByBlocksId(+params.get('id')))
    ).subscribe(res => {
      this.tarifs = res.body;
    });
  }
  onPayer(idB, idT) {
	  
	  if(this.stor && this.storlog){
		  
			this.panier.countPanier++;
			this.panier.setpanier(idB, this.infoM.InfoMembres.id, 1, idT);
	  }else{
		  this.panier.showerror(" Veuillez vous Connecter pour utiliser ce service","Authentification Requise");
		  this.openModal();
	  }
  }
  

  
    openModal () {
    const dialogRef = this.dialog.open(LoginComponent, {
      maxWidth: '700px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
		if(result && result == 1){
			
			window.location.reload(true);

		}
    });
  }
}
