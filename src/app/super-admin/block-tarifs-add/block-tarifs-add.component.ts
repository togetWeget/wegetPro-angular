import { Component, OnInit, Inject } from '@angular/core';
import { AdminCard } from '../../shared/views_models/admin-card';
import { AdminTarif } from '../../shared/views_models/admin-tarif';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Block } from '../../shared/models/block';
import { ToastrService } from 'ngx-toastr';
import { Tarif } from '../../shared/models/tarif/tarif';
import { PersonalButton } from '../../shared/views_models/personal-button';
import {BlockService} from '../../core/services/blocks/block.service';
import {TarifService} from '../../core/services/tarif/tarif.service';
import {LoginService} from '../../core/services/personne/membre/login.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as $ from 'jquery'; 
window["$"] =$; 
window["jQuery"] = $;
import "froala-editor/js/froala_editor.pkgd.min.js";

@Component({
  selector: 'app-block-tarifs-add',
  templateUrl: './block-tarifs-add.component.html',
  styleUrls: ['./block-tarifs-add.component.scss']
})
export class BlockTarifsAddComponent implements OnInit {
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
  tarif: Tarif;
  block: Block;
  tarifForm: any;


  constructor(private tarifService: TarifService, private fb: FormBuilder,private loginService: LoginService,
  	public dialogRef: MatDialogRef<BlockTarifsAddComponent>, 
  	private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
  		this.block = data.block;  
  		this.tarif = new Tarif (null, null, '', 0, '', '', this.block.id);
  		this.initForm();
  }

  ngOnInit() {
  }


  private initForm() {
  	this.tarifForm = this.fb.group({
	  	id: [this.tarif.id],
	  	version: [this.tarif.version],
	  	titre: [this.tarif.titre],
	  	prix: [this.tarif.prix],
	  	dureeTarif: [this.tarif.dureeTarif],
	  	description: [this.tarif.description],
	  	idBlock: [this.tarif.idBlock]
	  });
  }

  

  private convertisseur (fg: FormGroup): Tarif {
  	const blk = new Tarif(
  		fg.value['id'],
  		fg.value['version'],
  		fg.value['titre'],
  		fg.value['prix'],
  		fg.value['dureeTarif'],
  		fg.value['description'],
  		fg.value['idBlock']
  		);
  	return blk;
  }


  ajouterTarif () {
  	let tarifAdd: Tarif;
  	tarifAdd = this.convertisseur((this.tarifForm));
  	// console.log(tarifAdd);
  	this.loginService.ajoutTarif(tarifAdd)
  	.subscribe(res => {
        res.messages.toString();
        console.log(res.messages.toString());
        console.log('block  res ajoute', res.body);
        this.toastr.success('Tarif enregistré avec succès', 'Opération réussie');
        this.dialogRef.close();
    });
  }

}
