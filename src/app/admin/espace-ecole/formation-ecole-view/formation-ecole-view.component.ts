import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {OutilsService} from '../../../core/services/outils.service';
import { AdminCard } from '../../../shared/views_models/admin-card';
import { PersonalButton } from '../../../shared/views_models/personal-button';
import {FormationEcoleService} from '../../../core/services/formation-ecole.service';
import {Resultat} from '../../../shared/models/resultat';
import {Formation} from '../../../shared/models/ecole/formation';
import {SousBlock} from '../../../shared/models/sous-block';
import {SousBlockService} from '../../../core/services/sous-block.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-formation-ecole-view',
  templateUrl: './formation-ecole-view.component.html',
  styleUrls: ['./formation-ecole-view.component.scss']
})
export class FormationEcoleViewComponent implements OnInit {

	formation$: Observable<Resultat<Formation>>;
  formationSubject$ = new BehaviorSubject<string>('');
  image: string;
  image$: Observable<SafeUrl>;
  defaultImage: string = '../../../../assets/default.jpg';
  imageSubject$ = new BehaviorSubject<SafeUrl>(null);

  constructor(public dialogRef: MatDialogRef<FormationEcoleViewComponent>, 
  	@Inject(MAT_DIALOG_DATA) public data, public outils: OutilsService,
  	 private formationS: FormationEcoleService, private sanitizer: DomSanitizer) {
    this.image = this.data.image;
    this.image$ = this.imageSubject$.asObservable();
    this.imageSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(d => new Observable<SafeUrl>((observer)=>{
        observer.next(d);
      })));
    this.searchImage(this.image);
  }

  searchImage(img: string){
    this.image = img;
    this.imageSubject$.next(this.sanitize(this.getImage()));
  }

  ngOnInit() {
  	this.formation$ = this.formationSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(d => this.formationS.getFormationById(this.data.id))
      );
  	this.search();
  }

  search(){
    this.formationSubject$.next(Date.now()+'');
  }


  getImage(): string{
    return (this.image !== '' && this.image !== null)? this.image: this.defaultImage;
  }

  sanitize(img: string): SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(img);
  }

}
