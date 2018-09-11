import { Component, OnInit, Input, Output,ViewChild, ElementRef,EventEmitter } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {AbonnesService} from '../../../core/services/abonnes/abonnes.service';
import {ContactAbonneComponent} from '../contact-abonne/contact-abonne.component';
import { Detailblock } from '../../../shared/models/detailblock';
import { Resultat } from '../../../shared/models/Resultat';


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

  	constructor(private router: Router,
                private abonnesService: AbonnesService,
                private route: ActivatedRoute,
                private contactDialog: MatDialog) { }

	ngOnInit() {
      this.imagebg.nativeElement.style.backgroundImage = 'url(' + this.getPhotoSrc() + ')';
      this.imagebg.nativeElement.style.backgroundSize = 'cover';
      this.imagebg.nativeElement.style.backgroundPosition = 'center';
  }

  getPhotoSrc(): string {
    return (this.abonne.personne.pathPhoto!== null && 
      this.abonne.personne.pathPhoto !== undefined && this.abonne.personne.pathPhoto!== '') ? 
      this.abonne.personne.pathPhoto : 
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
        	data: {idPersonne: this.abonne.personne.id, nomPersonne: this.abonne.personne.nomComplet}
      	});
  	}
}
