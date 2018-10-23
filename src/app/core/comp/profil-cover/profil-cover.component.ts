import { Component, OnInit, ViewChild,
ElementRef, Input, Output, EventEmitter, OnChanges,
SimpleChange } from '@angular/core';
import {Router} from '@angular/router';
import { AdminCover } from '../../../shared/views_models/admin-cover';
import { Membre} from '../../../shared/models/personne/membres/membre';
import { Resultat} from '../../../shared/models/Resultat';


@Component({
  selector: 'app-profil-cover',
  templateUrl: './profil-cover.component.html',
  styleUrls: ['./profil-cover.component.scss']
})
export class ProfilCoverComponent implements OnInit, OnChanges {
  @ViewChild('img_cover') img_cover: ElementRef;
  defaultCover: any = '/assets/profile-cover.jpg';
  cover: string = this.defaultCover;
  @Input('id') id: string;
  @Input('titre') titre: string;
  @Input('height') height: string;
  @Input('vues') vues: string;
  @Input('isAdmin') isAdmin: boolean;
  @Input('image') set _cover(cover){
  	this.cover = cover;
    (this.height !== undefined && this.height !== null && this.height !== '')? 
    this.img_cover.nativeElement.style.height = this.height : null;
  	this.img_cover.nativeElement.style.backgroundImage = 'url(' + this.getCoverSrc() + ')';
    this.img_cover.nativeElement.style.backgroundSize = 'cover';
    this.img_cover.nativeElement.style.backgroundPosition = 'center';
    this.img_cover.nativeElement.style.position = 'relative';
  };
  @Output() clickOcur = new EventEmitter<string>();

  constructor(private router: Router) {
  	this.isAdmin = false;
  	this.vues = '-1';
  }

  ngOnInit() {
    (this.height !== undefined && this.height !== null && this.height !== '')? 
    this.img_cover.nativeElement.style.height = this.height : null;
    this.img_cover.nativeElement.style.backgroundImage = 'url(' + this.getCoverSrc() + ')';
    this.img_cover.nativeElement.style.backgroundSize = 'cover';
    this.img_cover.nativeElement.style.backgroundPosition = 'center';
    this.img_cover.nativeElement.style.position = 'relative';
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    
  }

  getCoverSrc(): any {
    return (this.cover!== null && 
      this.cover !== undefined && this.cover !== '') ? 
    this.cover : this.defaultCover;
  }

  modifAction() {
    this.clickOcur.emit(this.id);
  }
}