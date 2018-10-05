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

@Component({
  selector: 'app-formation-ecole-view',
  templateUrl: './formation-ecole-view.component.html',
  styleUrls: ['./formation-ecole-view.component.scss']
})
export class FormationEcoleViewComponent implements OnInit {

	formation$: Observable<Resultat<Formation>>;
  formationSubject$ = new BehaviorSubject<string>('');

  constructor(public dialogRef: MatDialogRef<FormationEcoleViewComponent>, 
  	@Inject(MAT_DIALOG_DATA) public data, public outils: OutilsService,
  	 private formationS: FormationEcoleService) { }

  ngOnInit() {
  	this.formation$ = this.formationSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(d => this.formationS.getFormationById(this.data.id))
      );
  	this.formation$.subscribe();
  }

  search(){
    this.formationSubject$.next(Date.now());
  }

}
