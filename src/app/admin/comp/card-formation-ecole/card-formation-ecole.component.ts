import { Component, OnInit, Input, Output,
EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-card-formation-ecole',
  templateUrl: './card-formation-ecole.component.html',
  styleUrls: ['./card-formation-ecole.component.scss']
})
export class CardFormationEcoleComponent implements OnInit {
  @Input('titre') titre: string;
  @Input('niveau') niveau: string;
  @Input('periode') periode: string;
  @Input('description') description: string;
  @Input('prix') prix: string;
  @Input('image') image: string;
  @Output('clickOcur') clickOcur = new EventEmitter<string>();
  defaultImage: string = '../../../../assets/default.jpg';
  image$: Observable<SafeUrl>;
  imageSubject$ = new BehaviorSubject<SafeUrl>(null);

  constructor(private sanitizer: DomSanitizer) {
    this.image$ = this.imageSubject$.asObservable();
    this.imageSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(d => new Observable<SafeUrl>((observer)=>{
        observer.next(d);
      })));
    this.searchImage(this.defaultImage);
  }

  searchImage(img: string){
    this.image = img;
    this.imageSubject$.next(this.sanitize(this.getImage()));
  }

  ngOnInit() {
    this.searchImage(this.image);
  }

  handleClick(id: string){
  	this.clickOcur.emit(id);
  }

  getImage(): string{
    return (this.image !== '' && this.image !== null)? this.image: this.defaultImage;
  }

  sanitize(img: string): SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(img);
  }

}
