import { Component, OnInit, ViewChild,
ElementRef, Input, Output, EventEmitter, OnChanges,
SimpleChange } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap, tap, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Observable, BehaviorSubject, interval} from 'rxjs';
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
  multiple_set: number = 0;
  multiple: string[] = [];
  @Input('multiple_interval') multiple_interval: number = 3000;
  @Input('id') id: string;
  @Input('titre') titre: string;
  @Input('height') height: string;
  @Input('vues') vues: string;
  @Input('isAdmin') isAdmin: boolean;
  @Input('flat') flat: boolean = null;
  @Input('multiple') set _multiple(multiple: string[]){
    this.multiple_set = 1;
    this.multiple = multiple;
    try{
      this.cover = this.multiple[0];
    }catch(e){}
    (this.height !== undefined && this.height !== null && this.height !== '')? 
    this.img_cover.nativeElement.style.height = this.height : null;
    this.img_cover.nativeElement.style.backgroundImage = 'url(' + this.getCoverSrc() + ')';
    this.img_cover.nativeElement.style.backgroundSize = 'cover';
    this.img_cover.nativeElement.style.backgroundPosition = 'center';
    this.img_cover.nativeElement.style.position = 'relative';
  };
  @Input('image') set _cover(cover){
  	this.cover = cover;
    (this.height !== undefined && this.height !== null && this.height !== '')? 
    this.img_cover.nativeElement.style.height = this.height : null;
  	this.img_cover.nativeElement.style.backgroundImage = 'url(' + this.getCoverSrc() + ')';
    this.img_cover.nativeElement.style.backgroundSize = 'cover';
    this.img_cover.nativeElement.style.backgroundPosition = 'center';
    this.img_cover.nativeElement.style.position = 'relative';
  };
  cover$: Observable<string>;
  coverSubject$ = new BehaviorSubject<string>('');
  @Output() clickOcur = new EventEmitter<string>();

  constructor(private router: Router) {
  	this.isAdmin = false;
  	this.vues = '-1';
    this.flat = false;
  }

  ngOnInit() {
    (this.height !== undefined && this.height !== null && this.height !== '')? 
    this.img_cover.nativeElement.style.height = this.height : null;
    this.img_cover.nativeElement.style.backgroundImage = 'url(' + this.getCoverSrc() + ')';
    this.img_cover.nativeElement.style.backgroundSize = 'cover';
    this.img_cover.nativeElement.style.backgroundPosition = 'center';
    this.img_cover.nativeElement.style.position = 'relative';
    if(this.multiple_set === 1){
      this.animateCover();
    }
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    
  }

  animateCover(){
    interval(this.multiple_interval).subscribe(res => {
        if(this.coverHasNext()){
          this.cover = this.multiple[this.coverCurrentPosition() + 1];
        }else{
          this.cover = this.multiple[0];
        }
        this.img_cover.nativeElement.style.backgroundImage = 'url(' + this.getCoverSrc() + ')';        
      });
  }

  private selectNext(){
    if(this.coverHasNext()){
      this.cover = this.multiple[this.coverCurrentPosition() + 1];
    }else{
      this.cover = this.multiple[0];
    }
  }

  private coverHasNext(): boolean{
    let found: boolean = null;
    found = false;
    let cp: number = 0;
    if(this.coverCurrentPosition() !== -1){
      if((this.coverCurrentPosition() + 1) < this.multiple.length){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  private coverCurrentPosition(): number{
    let found: boolean = null;
    found = false;
    let cp: number = -1;
    try{
      while((cp + 1) < this.multiple.length && !found){
        cp++;
        if(this.cover === this.multiple[cp]) found = true;
      }
    }catch(e){

    }
    if(found){
      return cp;
    }else{
      -1;
    }
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