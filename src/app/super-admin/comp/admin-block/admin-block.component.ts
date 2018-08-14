import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Block } from '../../../shared/models/block';
import { Resultat } from '../../../shared/models/resultat';


@Component({
  selector: 'app-admin-block',
  templateUrl: './admin-block.component.html',
  styleUrls: ['./admin-block.component.scss']
})
export class AdminBlockComponent implements OnInit {
  @Input('block') block: Block;
  @Output() butonClick = new EventEmitter<Resultat<Block>>();
  defaultPhoto: string = '/assets/placeholder-image.jpg';

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }

  getPhotoSrc(): string {
    return (this.block.pathPhoto !== null && 
      this.block.pathPhoto !== undefined && this.block.pathPhoto !== '') ? 
    this.block.pathPhoto : this.defaultPhoto;
  }

  goto(url: string){
  	this.router.navigate([url]);
  }

  viewApercu () {
    this.butonClick.emit(new Resultat (0,['apercu'], this.block));
  }

  deleteBlock () {
    this.butonClick.emit(new Resultat (1,['delete'], this.block));
  }

  changeImage () {
    this.butonClick.emit(new Resultat (2,['image'], this.block));
  }

}
