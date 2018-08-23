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

  constructor(private router: Router, private dialog: MatDialog,) { }

  ngOnInit() {

  }
  getPhotoSrc(): string {
    return (this.detailBlock.block.pathPhoto !== null && 
    this.detailBlock.block.pathPhoto !== undefined && this.detailBlock.block.pathPhoto !== '') ? 
    this.detailBlock.block.pathPhoto : 
    this.defaultPhoto;
  }
  onVoirDetail(id:number){
  	this.router.navigate(['/admin/espace', this.detailBlock.id])
  }
  onReabonne(id:number){
  	this.router.navigate(['/admin/reabonnement','prix', this.detailBlock.id])
  }
  onDesabonne(id:number){
  	this.router.navigate(['/admin/espace', this.detailBlock.id])
  }
}
