import { Component, OnInit, ViewChild,
ElementRef, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import { AdminCover } from '../../../shared/views_models/admin-cover';

@Component({
  selector: 'app-cover-profil-admin',
  templateUrl: './cover-profil.component.html',
  styleUrls: ['./cover-profil.component.scss']
})
export class CoverProfilComponent implements OnInit {
  @ViewChild('img_cover') img_cover: ElementRef;
  @ViewChild('img_profil') img_profil: ElementRef;
  defaultProfil: any = '/assets/placeholder-image.jpg';
  defaultCover: any = '/assets/profile-cover.jpg';
  @Input('cover') cover: AdminCover;
  @Output() clickOcur = new EventEmitter<string>();

  constructor(private router: Router) { }

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
    return (this.cover.coverPath!== null && 
      this.cover.coverPath !== undefined && this.cover.coverPath !== '') ? 
    this.cover.coverPath : 
    this.defaultCover;
  }

  getProfilSrc(): any {
    return (this.cover.profilPath !== null && 
      this.cover.profilPath !== undefined && this.cover.profilPath !== '') ? 
    this.cover.profilPath : 
    this.defaultProfil;
  }

  modifAction() {
    if(this.cover.modifLink !== null) {
      this.router.navigate([this.cover.modifLink]);
    } else {
      this.clickOcur.emit('modif');
    }
  }
  voirProfilAction() {
    if(this.cover.voirProfilLink !== null) {
      this.router.navigate([this.cover.voirProfilLink]);
    } else {
      this.clickOcur.emit('voirProfil');
    }
  }

}
