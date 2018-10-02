import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {AdminCard} from '../../../shared/views_models/admin-card';
import {FlashInfo} from '../../../shared/models/flash-info';
import { FlashInfoService } from '../../../core/services/flash-info.service';
import {Resultat} from '../../../shared/models/resultat';
import {PersonalButton} from '../../../shared/views_models/personal-button';
import {FlashInfoAddComponent} from '../flash-info-add/flash-info-add.component';
import { SousBlockService } from '../../../core/services/sous-block.service';

@Component({
  selector: 'app-flash-info-ecole',
  templateUrl: './flash-info-ecole.component.html',
  styleUrls: ['./flash-info-ecole.component.scss']
})
export class FlashInfoEcoleComponent implements OnInit {

  admin_card: AdminCard;
  id_block: number;
  id_sous_block: number;
  flashs: FlashInfo;
  flash$: Observable<Resultat<FlashInfo>>;
  flashSubject$ =  new BehaviorSubject<string>('');

  constructor(public dialog: MatDialog, private router: Router, 
  	private route: ActivatedRoute, private flashInfoS: FlashInfoService, 
    private sousBlockS: SousBlockService) {
  	this.admin_card = new AdminCard('liste des fhash infos', null, 
  		[new PersonalButton(
  			'ajout',
  			'Nouvelle info',
  			'plus',
  			null,
  			'blue'
  		)]
  	);
  	this.flash$ = this.flashSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(d => this.flashInfoS.getFlashInfoById(this.id_sous_block))
      );
  }

  search(id){
    this.flashSubject$.next(Date.now()+'');
  }

  ngOnInit() {
  	this.route.paramMap.pipe(
  		switchMap((params: ParamMap) => {
  			this.id_block = +params.get('id');
  			return this.sousBlockS.getSousBlockByBlock(this.id_block);
  		})
  		).subscribe(d => {
        console.log('ngOnInit', d);
        this.id_sous_block = d.body.id;
        this.search(this.id_sous_block);
  		});
  }

  handleClick(event){
  	switch (event) {
  		case "ajout":
  			this.ajouterFlash();
  			break;
  		
  		default:
  			// code...
  			break;
  	}
  }

  ajouterFlash(): void {
    const dialogRef = this.dialog.open(FlashInfoAddComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {id: this.id_block}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was[0] closed');
      this.search(this.id_sous_block);
      // this.animal = result;
    });
  }

  modifierFlash(id){

  }


}
