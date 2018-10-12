import { Component, OnInit, Input, Output,ViewChild, ElementRef,EventEmitter } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {AbonnesService} from '../../../core/services/abonnes/abonnes.service';
import {ContactAbonneComponent} from '../contact-abonne/contact-abonne.component';
import { Detailblock } from '../../../shared/models/detailblock';
import { Resultat } from '../../../shared/models/Resultat';
import * as $ from 'jquery';


@Component({
  selector: 'app-abonne',
  templateUrl: './abonne.component.html',
  styleUrls: ['./abonne.component.scss']
})
export class AbonneComponent implements OnInit {
	@Input('abonne') abonne: Detailblock;
  	@Output() butonClick = new EventEmitter<Resultat<Detailblock>>();
  	defaultPhoto: any = '/assets/placeholder-image.jpg';
  	@ViewChild('imagebg') imagebg: ElementRef;
  	status: number;
  	typeblock:string;
	public nombredevue = 0;
  	constructor(private router: Router,
                private abonnesService: AbonnesService,
                private route: ActivatedRoute,
                private contactDialog: MatDialog) { }

	ngOnInit() {
      this.imagebg.nativeElement.style.backgroundImage = 'url(' + this.getPhotoSrc() + ')';
      this.imagebg.nativeElement.style.backgroundSize = 'cover';
      this.imagebg.nativeElement.style.backgroundPosition = 'center';
	  // this.newview();
	  this.nombredevue = this.abonne.nombreVue;
	  this.typeblock='';
  }

  getPhotoSrc(): string {
    return (this.abonne.membre.pathPhoto!== null && 
      this.abonne.membre.pathPhoto !== undefined && this.abonne.membre.pathPhoto!== '') ? 
      this.abonne.membre.pathPhoto : 
      this.defaultPhoto;
    }

    getStatutMembre() {
      if (this.status === 1) {
        return 'Discuter avec cet abonné';
      } else {
        return '';
      }
    }

  	onViewProfileAbonne(ab: any) {
	    this.router.navigate(['/site/abonnes', 'profile', this.abonne.id]);
	}

  	onContactAbonne(ab: any): void {
    	const dialogRef = this.contactDialog.open(ContactAbonneComponent,
      	{
        	width: '600px',
        	data: {idPersonne: this.abonne.membre.id, nomPersonne: this.abonne.membre.nomComplet}
      	});
  	}
	
	gethrf(){

	}
	newview(){
			// let CheminComplet = document.location.href;
			// const uriln = CheminComplet.split('/');
			// const rival = uriln[uriln.length - 1];
			// alert(rival);
			let u = this;
			const data: any = {
								idPersonne: this.abonne.membre.id,
								idBlock: this.abonne.block.id
							};
							
					console.log(data);
			$.ajax({
			url:'http://wegetback:8080/nombreVue',
			type:'put',
			contentType: 'application/json',
			data:JSON.stringify(data),
			dataType:'json',
			success: (valeur)=>{
			if(valeur.body != null){
				u.nombredevue = parseInt(valeur.body.nombreVue);
				console.log(valeur);
			}
			},
			error: (err)=>{
					console.log(err);
			}
	
			});
		
		}
}
