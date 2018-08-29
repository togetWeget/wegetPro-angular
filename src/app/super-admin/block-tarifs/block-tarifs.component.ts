import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { AdminTopZone } from '../../shared/views_models/admin-top-zone';
import { Navs } from '../../shared/views_models/navs';
import { AdminCard } from '../../shared/views_models/admin-card';
import { AdminTarif } from '../../shared/views_models/admin-tarif';
import { Block } from '../../shared/models/block';
import { Tarif } from '../../shared/models/tarif/tarif';
import { PersonalButton } from '../../shared/views_models/personal-button';
import {TarifService} from '../../core/services/tarif/tarif.service';
import {BlockService} from '../../core/services/blocks/block.service';
import {BlockTarifsAddComponent} from '../block-tarifs-add/block-tarifs-add.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {LoginService} from '../../core/services/personne/membre/login.service';
import * as $ from 'jquery'; 
window["$"] =$; 
window["jQuery"] = $;
import "froala-editor/js/froala_editor.pkgd.min.js";

@Component({
  selector: 'app-super-admin-block-tarifs',
  templateUrl: './block-tarifs.component.html',
  styleUrls: ['./block-tarifs.component.scss']
})
export class BlockTarifsComponent implements OnInit {

  top_zone: AdminTopZone = null;
  admin_card: AdminCard = null;
  editor_options: Object = {
	  height: 150,
	  toolbarButtons: [
	  'fullscreen', 
	  'bold', 
	  'italic', 
	  'underline', 
	  'strikeThrough', 
	  '|', 
	  'fontFamily', 
	  'fontSize', 
	  'color', 
	  '|', 
	  'paragraphFormat', 
	  'align', 
	  '|', 
	  'specialCharacters', 
	  'insertHR', 
	  '|', 
	  'html', 
	  '|', 
	  'undo', 
	  'redo']
	};
  tarifs: Tarif[] = [];
  id: number;
  block: Block;

  constructor(private blockService: BlockService, public dialog: MatDialog, private  loginService: LoginService,
  	private toastr: ToastrService, private router: Router,
  	private route: ActivatedRoute, private tarifService: TarifService) {
  	this.top_zone = new AdminTopZone (
  		'Block', 
  		'Grille tarifaire',
  		[
  			new Navs('Accueil', '/super/admin'),
  			new Navs('Blocks', '/super/admin/blocks'),
  		],
  		new Navs ('Modifier', ''),
  		'home',
  	);

  	this.admin_card = new AdminCard(
  		'Grille tarifaire du block',
  		'',
  		[
  			new PersonalButton ('ajoutFormule', 'Ajouter une formule', 'plus', '', 'green')
  		]
  		);
  }

  ngOnInit() {
  	this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
          this.id = +params.get('id');
           return this.loginService.getBlockById(this.id); 
        }
      )
    ).subscribe(res => {
  		this.block = res.body;  
  		this.getTarifs();      
      }
    );
  }

  handleClick (id_button: string) {
  	switch (id_button) {
  		case "ajoutFormule":
  			this.ajouterModal();
  			break;
  		
  		default:
  			console.log('default ');
  			break;
  	}
  }

  ajouterModal () {
  	const dialogRef = this.dialog.open(BlockTarifsAddComponent, {
      maxWidth: '700px',
      maxHeight: '400px',
      data: {block: this.block}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTarifs();
    });
  }

  getTarifs () {
  	this.loginService.tarifParBlockId(this.block.id)
      .subscribe((res: any) => {
      	this.tarifs = res.body;
	    }
	  );
  }
}
