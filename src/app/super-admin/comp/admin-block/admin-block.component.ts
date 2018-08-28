import { Component, OnInit, Input, Output, EventEmitter,
SecurityContext, ViewChild, ElementRef} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  defaultPhoto: any = '/assets/placeholder-image.jpg';
  @ViewChild('imagebg') imagebg: ElementRef;

  constructor(private router: Router, private dialog: MatDialog, 
    private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.imagebg.nativeElement.style.backgroundImage = 'url(' + this.getPhotoSrc() + ')';
    this.imagebg.nativeElement.style.backgroundSize = 'cover';
    this.imagebg.nativeElement.style.backgroundPosition = 'center';
  }

  getPhotoSrc(): any {
    // console.log(this.domSanitizer.bypassSecurityTrustStyle(this.block.pathPhoto));
    return (this.block.pathPhoto !== null && 
      this.block.pathPhoto !== undefined && this.block.pathPhoto !== '') ? 
    this.block.pathPhoto : 
    this.defaultPhoto;
  }

  sanitize (val: string) {
    this.domSanitizer.bypassSecurityTrustStyle(val); 
    // this.domSanitizer.sanitize(this, val);
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
