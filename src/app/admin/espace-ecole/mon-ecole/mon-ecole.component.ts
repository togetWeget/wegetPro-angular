import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Formgroup,
FormArray } from '@angular/forms';
import { Router, ActivatedRoute, ParamsMap } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { OutilsService } from '../../../core/services/outils.service';
import { Block } from '../../../shared/models/block';
import { SousBlock } from '../../../shared/models/sous-block';
import { Telephone } from '../../../shared/models/personne/membres/telephone';
import { Adresse } from '../../../shared/models/adresse/adresse';
import { Resultat } from '../../../shared/models/Resultat';
import { SousBlockService } from '../../../core/services/sous-block.service';
import { BlockService } from '../../../core/services/blocks/block.service';

import * as $ from 'jquery';
window["$"] =$;
window["jQuery"] = $;
import "froala-editor/js/froala_editor.pkgd.min.js";

@Component({
  selector: 'app-mon-ecole',
  templateUrl: './mon-ecole.component.html',
  styleUrls: ['./mon-ecole.component.scss']
})
export class MonEcoleComponent implements OnInit {
  // contentControl = new FormControl('');
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
	ecoleForm: Formgroup;
	id_block: number = null;
	block: Block = null;

  constructor(private outils: OutilsService, private fb: FormBuilder,
  	private router: Router, private route: ActivatedRoute, 
  	private sousBlocksS: SousBlockService, private blockS: BlockService) { }

  ngOnInit() {
  	this.initForm();
  	this.route.paramsMap.pipe(
  		switchMap((params: ParamsMap) => {
  			this.id_block = +params.get('id');
  			return this.blockS.getBlockById(this.id);
  		})
  		).subscribe(
  		(data) => {
  			this.block = data.body;
  			this.initForm();
  		}
  		);
  }

  initForm(){
  	this.ecoleForm = this.fb.group({
  		id: [null],
  		version: [null],
  		typeEtablissement: [null],
  		refSousBlock: [null],
  		presentation: [null],
  		description: [null],
  		pathPhoto: this.fb.array([
  			this.fb.control('')
  		]),
  		pathLogo: [null],
  		adresse: this.fb.array([
  			boitePostal: [null],
  			email: [null],
  			pays: [null],
  			ville: [null],
  			quartier: [null],
  			adresseGeographique: [null],
  			siteWeb: [null]
  		]),
  		telephones: this.fb.array([
  			this.fb.control('')
  		]),
  		id_Block: [this.block],
  	});
  }

  convertToSousBlock(){
  	const sousBloc = new SousBlock(
  		this.ecoleForm.get('id'),
  		this.ecoleForm.get('version'),
  		this.ecoleForm.get('typeEtablissement'),
  		this.ecoleForm.get('refSousBlock'),
  		this.ecoleForm.get('presentation'),
  		this.ecoleForm.get('description'),
  		this.ecoleForm.get('pathPhoto'),
  		this.ecoleForm.get('pathLogo'),
  		this.ecoleForm.get('adresse'),
  		this.ecoleForm.get('telephones'),
  		this.ecoleForm.get('id_block')
  		);
  	return sousBloc;
  }

  update() {
  	this.sousBlocks.modifierSosusBlock(this.convertToSousBlock())
  	.subscribe((data)=> {

  	})
  }


}
