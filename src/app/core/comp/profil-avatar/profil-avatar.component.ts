import { Component, OnInit, ViewChild,
Input, Output, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profil-avatar',
  templateUrl: './profil-avatar.component.html',
  styleUrls: ['./profil-avatar.component.scss']
})
export class ProfilAvatarComponent implements OnInit {
	@ViewChild('img_profil') img_profil: ElementRef;
	defaultProfil: any = '/assets/placeholder-image.jpg';
	profil: string = this.defaultProfil;
	@Input('id') id: string;
	@Input('isAdmin') isAdmin: boolean;
	@Output() clickOcur = new EventEmitter<string>();
	@Input('image') set _profil(profil){
  	this.profil = profil;
  	this.img_profil.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
    this.img_profil.nativeElement.style.backgroundSize = 'cover';
    this.img_profil.nativeElement.style.backgroundPosition = 'center';
    this.img_profil.nativeElement.style.position = 'relative';
  };
  constructor() {
  	this.isAdmin = false;
  }

  ngOnInit() {
  	this.img_profil.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
    this.img_profil.nativeElement.style.backgroundSize = 'cover';
    this.img_profil.nativeElement.style.backgroundPosition = 'center';
    this.img_profil.nativeElement.style.position = 'relative';
  }

  getProfilSrc(): any {
    return (this.profil!== null && 
      this.profil !== undefined && this.profil !== '') ? 
    this.profil : this.defaultProfil;
  }

  handleClick(){
  	this.clickOcur.emit(this.id);
  }

}
