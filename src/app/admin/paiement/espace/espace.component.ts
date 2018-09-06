import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Detailblock } from '../../../shared/models/detailblock';

@Component({
  selector: 'app-espace',
  templateUrl: './espace.component.html',
  styleUrls: ['./espace.component.scss']
})
export class EspaceComponent implements OnInit {
	@Input('detailBlock') detailBlock: Detailblock;
	defaultPhoto: string = '/assets/placeholder-image.jpg';
  type_espace:string ='';

  constructor(private router: Router, private dialog: MatDialog,) { }

  ngOnInit() {

  }
  getPhotoSrc(): string {
    return (this.detailBlock.block.pathPhoto !== null && 
    this.detailBlock.block.pathPhoto !== undefined && this.detailBlock.block.pathPhoto !== '') ? 
    this.detailBlock.block.pathPhoto : 
    this.defaultPhoto;
  }
  onEditerEspace(dblk:number){
    this.type_espace=this.detailBlock.block.typeBlock;
    dblk=this.detailBlock.id;
    switch (this.type_espace) {
      case "annonce":
        this.router.navigate(['/admin/espace','annonce',dblk]);
        break;
      case "ecole":
        this.router.navigate(['/admin/espace','ecole',dblk]);
        break;
      case "immobilier":
        this.router.navigate(['/admin/espace','immobilier',dblk]);
        break;
      default:
        this.router.navigate(['/admin/espace','competence',dblk]);
        break;
    }

  }
  onReabonne(){
  	this.router.navigate(['/admin/paiement','prix', this.detailBlock.block.id])
  }
  onDesabonne(){
  	this.router.navigate(['/admin/espace', this.detailBlock.block.id])
  }
}
