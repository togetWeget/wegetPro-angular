import { Component, OnInit, Input, Output,ViewChild, ElementRef,EventEmitter } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {switchMap} from 'rxjs/operators';
import { SousBlock } from '../../../shared/models/sous-block';
import {ContactAbonneComponent} from '../../abonnes/contact-abonne/contact-abonne.component';

@Component({
  selector: 'app-single-ecole',
  templateUrl: './single-ecole.component.html',
  styleUrls: ['./single-ecole.component.scss']
})
export class SingleEcoleComponent implements OnInit {
  @Input('ecole') ecole:SousBlock;
  defaultPhoto: any = '/assets/placeholder-image.jpg';
  @ViewChild('imagebg') imagebg: ElementRef;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private contactDialog: MatDialog) { }

  ngOnInit() {
    this.imagebg.nativeElement.style.backgroundImage = 'url(' + this.getPhotoSrc() + ')';
      this.imagebg.nativeElement.style.backgroundSize = 'cover';
      this.imagebg.nativeElement.style.backgroundPosition = 'center';
  }
  getPhotoSrc(): string {
    return (this.ecole.pathLogo!== null && 
      this.ecole.pathLogo !== undefined && this.ecole.pathLogo!== '') ? 
      this.ecole.pathLogo : 
      this.defaultPhoto;
   }

  onViewEcole(){
    this.router.navigate(['/site/abonnes', 'profile', this.ecole.detailBlock.id]); 
  }
  onContactEcole(){
  	const dialogRef = this.contactDialog.open(ContactAbonneComponent,
    {
      width: '600px',
      data: {idPersonne: this.ecole.detailBlock.membre.id, nomPersonne: this.ecole.detailBlock.membre.nomComplet}
    });
  }
}
