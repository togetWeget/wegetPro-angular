import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {OutilsService} from '../../../core/services/outils.service';
import {Formation} from '../../../shared/models/ecole/formation';
import {Cours} from '../../../shared/models/ecole/cours';
import {SousBlock} from '../../../shared/models/sous-block';
import {SousBlockService} from '../../../core/services/sous-block.service';
import {FormationEcoleService} from '../../../core/services/formation-ecole.service';


@Component({
  selector: 'app-formation-ecole-update',
  templateUrl: './formation-ecole-update.component.html',
  styleUrls: ['./formation-ecole-update.component.scss']
})
export class FormationEcoleUpdateComponent implements OnInit {

  formationForm: FormGroup;
  sousBlock: SousBlock;
  formation: Formation;

  constructor(public dialogRef: MatDialogRef<FormationEcoleUpdateComponent>, 
  	@Inject(MAT_DIALOG_DATA) public data, public outils: OutilsService,
    private fb: FormBuilder, private sousBlockS: SousBlockService,
    private formationS: FormationEcoleService) { }

  ngOnInit() {
    this.initForm();
    this.sousBlockS.getSousBlockByIdDetailBlock(this.data.id_block)
    .subscribe(response =>  {
      this.sousBlock = response.body;
      this.formationS.getFormationById(this.data.id)
      .subscribe(resp => {
      	this.formation = resp.body;
      	this.initForm();
      });
    });
  }

  initForm(){
    let courInit = new FormArray([]);
    try{
    	const fc = this.formation.cour;
    	if(fc.length !== 0){
    		for(const co of fc){
    			courInit.push(this.fb.group({
    				id: [co.id],
    				version: [co.version],
    				titre: [co.titre],
    				description: [co.description]
    			}));
    		}
    	}
    }catch(e){
      console.error('error add cour', e);
    }

    try{
      this.formationForm = this.fb.group({
        id: [this.formation.id],
        version: [this.formation.version],
        titre: [this.formation.titre],
        description: [this.formation.description],
        formation_niveau: [this.formation.formation_niveau],
        contenu: [this.formation.contenu],
        dureeFormation: [this.formation.dureeFormation],
        diplome: [this.formation.diplome],
        formation_prix: [this.formation.formation_prix],
        cour: courInit,
        sousBlock: [this.sousBlock]
      });
    }catch(e){
      this.formationForm = this.fb.group({
      id: [null],
        version: [0],
        titre: [''],
        description: [''],
        formation_niveau: [''],
        contenu: [''],
        dureeFormation: [''],
        diplome: [''],
        formation_prix: [''],
        cour: this.fb.array([
          this.courBody()]),
        sousBlock: [null]
        });
      console.error('initForm error', e);
    }
  }

  get cour(){
    return this.formationForm.get('cour') as FormArray;
  }

  addCour(){
    this.cour.push(this.courBody());
  }

  removeCour(id){
    this.cour.removeAt(id);
  }

  courBody(){
    return this.fb.group({
      id: [null],
      version: [0],
      titre: [''],
      description: ['']
    });
  }

  onSubmit(){
    this.formationS.ajoutFormation(this.convertisseur(this.formationForm))
    .subscribe(response => {
  	  this.dialogRef.close();
    });
  }

  convertisseur(fg: FormGroup): Formation{
    return new Formation(
      fg.value['id'],
      fg.value['version'],
      fg.value['titre'],
      fg.value['description'],
      fg.value['formation_niveau'],
      fg.value['contenu'],
      fg.value['dureeFormation'],
      fg.value['diplome'],
      fg.value['formation_prix'],
      fg.value['cour'],
      fg.value['sousBlock']
      );
  }
}
