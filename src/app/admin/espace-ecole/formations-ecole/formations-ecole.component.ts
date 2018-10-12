import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AdminCard } from '../../../shared/views_models/admin-card';
import { PersonalButton } from '../../../shared/views_models/personal-button';
import {FormationEcoleAddComponent} from '../formation-ecole-add/formation-ecole-add.component';
import {FormationEcoleViewComponent} from '../formation-ecole-view/formation-ecole-view.component';
import {FormationEcoleUpdateComponent} from '../formation-ecole-update/formation-ecole-update.component';
import {FormationEcoleService} from '../../../core/services/formation-ecole.service';
import {Resultat} from '../../../shared/models/resultat';
import {Formation} from '../../../shared/models/ecole/formation';
import {SousBlock} from '../../../shared/models/sous-block';
import {SousBlockService} from '../../../core/services/sous-block.service';

@Component({
  selector: 'app-formations-ecole',
  templateUrl: './formations-ecole.component.html',
  styleUrls: ['./formations-ecole.component.scss']
})
export class FormationsEcoleComponent implements OnInit {
  admin_card: AdminCard;
  id_block: number = 0;
  id_sous_block: number = 0;
  id_edit: number = 0;
  formation$: Observable<Resultat<Formation>>;
  formationSubject$ = new BehaviorSubject<string>('');
  
  constructor(public dialog: MatDialog, private route: ActivatedRoute,
   private router: Router, private formationS: FormationEcoleService,
   private sousBlockS: SousBlockService) {
  	this.admin_card = new AdminCard(
  		'Tout les programmes',
  		null,
  		[
  		new PersonalButton(
			'ajout',
			'Ajouter un programme',
			'plus',
			'',
			'blue',
			)
  		],
  		);
  }

  ngOnInit() {
    this.formation$ = this.formationSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(d => this.formationS.getFormationBySousBlock(this.id_sous_block))
      );

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id_block = +params.get('id');
        return this.sousBlockS.getSousBlockByIdDetailBlock(this.id_block);
      })
      ).subscribe(resp => {
        this.id_sous_block = resp.body.id;
        this.search();
      });
  }

  search(){
    this.formationSubject$.next(Date.now()+'');
  }

  handleClick(ev){
    switch (ev) {
      case "ajout":
        this.gotoAdd();
        break;
      
      default:
        // code...
        break;
    }
  }

  handleEcoleClick(ev){
  	switch (ev) {
  		case "view":
        this.gotoView();
        break;
      case "edit":
        this.gotoEdit();
        break;
      case "delete":
        this.gotoDelete();
  			break;
  		
  		default:
  			// code...
  			break;
  	}
  }

  gotoAdd(): void {
    const dialogRef = this.dialog.open(FormationEcoleAddComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {id_block: this.id_block}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.search();
    });
  }

  gotoView(): void {
    const dialogRef = this.dialog.open(FormationEcoleViewComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {id_block: this.id_block, id: this.id_edit}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.search();
    });
  }

  gotoEdit(): void {
    const dialogRef = this.dialog.open(FormationEcoleUpdateComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {id_block: this.id_block, id: this.id_edit}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.search();
    });
  }
  gotoDelete(): void {
    this.formationS.supprimerFormation(this.id_edit)
    .subscribe(resp => {
      this.search();
    });
  }

}
