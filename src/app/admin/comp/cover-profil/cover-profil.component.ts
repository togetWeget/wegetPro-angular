import { Component, OnInit, ViewChild,
ElementRef } from '@angular/core';

@Component({
  selector: 'app-cover-profil-admin',
  templateUrl: './cover-profil.component.html',
  styleUrls: ['./cover-profil.component.scss']
})
export class CoverProfilComponent implements OnInit {
  @ViewChild('img_cover') img_cover: ElementRef;
  @ViewChild('img_profil') img_profil: ElementRef;
  defaultPhoto: any = '/assets/placeholder-image.jpg';

  constructor() { }

  ngOnInit() {
  	this.img_cover.nativeElement.style.backgroundImage = 'url(' + this.getCoverSrc() + ')';
    this.img_cover.nativeElement.style.backgroundSize = 'cover';
    this.img_cover.nativeElement.style.backgroundPosition = 'center';
    this.img_cover.nativeElement.style.position = 'relative';
  	this.img_profil.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
    this.img_profil.nativeElement.style.backgroundSize = 'cover';
    this.img_profil.nativeElement.style.backgroundSize = 'cover';
    this.img_profil.nativeElement.style.backgroundPosition = 'center';
  }

  getCoverSrc(): any {
  	return '/assets/profile-cover.jpg';
    // console.log(this.domSanitizer.bypassSecurityTrustStyle(this.block.pathPhoto));
    // return (this.block.pathPhoto !== null && 
    //   this.block.pathPhoto !== undefined && this.block.pathPhoto !== '') ? 
    // this.block.pathPhoto : 
    // this.defaultPhoto;
  }

  getProfilSrc(): any {
  	return '/assets/placeholder-image.jpg';
    // console.log(this.domSanitizer.bypassSecurityTrustStyle(this.block.pathPhoto));
    // return (this.block.pathPhoto !== null && 
    //   this.block.pathPhoto !== undefined && this.block.pathPhoto !== '') ? 
    // this.block.pathPhoto : 
    // this.defaultPhoto;
  }

}
