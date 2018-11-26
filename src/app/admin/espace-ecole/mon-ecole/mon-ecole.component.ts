import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup,
FormArray } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { OutilsService } from '../../../core/services/outils.service';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';
import { Block } from '../../../shared/models/block';
import { Detailblock } from '../../../shared/models/detailblock';
import { SousBlock } from '../../../shared/models/sous-block';
import { Telephone } from '../../../shared/models/personne/membres/telephone';
import { Adresse } from '../../../shared/models/adresse/adresse';
import { Resultat } from '../../../shared/models/Resultat';
import { Partenaire } from '../../../shared/models/partenaire';
import { Chiffre } from '../../../shared/models/chiffre';
import { Temoignage } from '../../../shared/models/temoignage';
import { SousBlockService } from '../../../core/services/sous-block.service';
import { SaveFile2Component } from '../../../core/comp/save-file2/save-file2.component';
import { LnlFilesManagerService, ParamsModel, FileManagerModel } from 'lnl-files-manager';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';  
import { BlockService } from '../../../core/services/blocks/block.service';
import { ChiffreService } from '../../../core/services/chiffre.service';

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
	ecoleForm: FormGroup;
	id_block: number = null;
  detailBlock: Detailblock = null;
  partenaires_: Partenaire[];
  chiffres_: Chiffre[];
  temoignages_: Temoignage[];
	// block: Block = null;
  sousBlock: SousBlock;
  sousBlock$: Observable<Resultat<SousBlock>>;
  sousBlockSubject$ =  new BehaviorSubject<string>('');

  constructor(private outils: OutilsService, private fb: FormBuilder,
  	private router: Router, private route: ActivatedRoute, 
  	private sousBlocksS: SousBlockService, private blockS: BlockService,
    private abonnesS: AbonnesService, private chiffresS: ChiffreService,
    public dialog: MatDialog) { 
    // this.sousBlock = new SousBlock();
    this.sousBlock$ = this.sousBlockSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(d => this.sousBlocksS.getSousBlockByIdDetailBlock(this.detailBlock.id))
      );
  }

  ngOnInit() {
    // this.initForm();
  	this.route.paramMap.pipe(
  		switchMap((params: ParamMap) => {
  			this.id_block = +params.get('id');
  			return this.abonnesS.getProfilById(this.id_block);
  		})
  		).subscribe(
  		(data) => {
        this.detailBlock = data.body;  
        
        this.sousBlock$.subscribe(
          (data) => {
            try{
              this.sousBlock = data.body;  
              this.initForm();
              
            }catch(e){console.error('sousBlock');}
          }
          );
      }
      );
  }

  choiseImagePartenaire(part: Partenaire){
    console.log('part', part);
    let params = [
          new ParamsModel('id', part.id+'')
        ];
    const dialogRef = this.dialog.open(SaveFile2Component, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'image_photo', multiple: false, accept: 'image/*',
      params: params,
      url: `${this.outils.getBaseUrl()}/partenaireLogo`}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
      // this.sousBlockS.refreshStreamSousBlockById(this.id_block);
      // this.search(Date.now()+'');
      // this.search(localStorage.getItem('log'));
    });
  }

  choiseImageTemoignage(tem: Temoignage){
    let params = [
          new ParamsModel('id', tem.id+'')
        ];
    const dialogRef = this.dialog.open(SaveFile2Component, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'image_photo', multiple: false, accept: 'image/*',
      params: params,
      url: `${this.outils.getBaseUrl()}/temoignagePhoto`}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
      // this.sousBlockckS.refreshStreamSousBlockById(this.id_block);
      // this.search(Date.now()+'');
      // this.search(localStorage.getItem('log'));
    }); 
  }

  search(){
    this.sousBlockSubject$.next(Date.now()+'');
  }

  initForm(){
    const telephonesInit = new FormArray([]);
    const chiffresInit = new FormArray([]);
    const partenairesInit = new FormArray([]);
    const temoignagesInit = new FormArray([]);

    try{
      const teleph = this.sousBlock.telephones;
      if(teleph.length !== 0) {
        for(const tel of teleph){
          telephonesInit.push(this.fb.group({
            id: [tel.id],
            version: [tel.version],
            type: [tel.type],
            numero: [tel.numero]
          }));
        }
      }
    }catch(e){
      console.error('telephones');
    }
    try{
      const chiffres = this.sousBlock.chiffre;
      if(chiffres.length !== 0) {
        for(const chif of chiffres){
          chiffresInit.push(this.fb.group({
            id: [chif.id],
            version: [chif.version],
            titre: [chif.titre],
            chiffre: [chif.chiffre],
            description: [chif.description],
            id_SousBlock: [chif.id_SousBlock]
          }));
        }
      }
    }catch(e){
      console.error('chiffres');
    }
    try{
      const partenaires = this.sousBlock.partenaire;
      if(partenaires.length !== 0) {
        for(const part of partenaires){
          partenairesInit.push(this.fb.group({
            id: [part.id],
            version: [part.version],
            raisonSocial: [part.raisonSocial],
            sieWebPatenaire: [part.sieWebPatenaire],
            pathLogo: [part.pathLogo],
            id_SousBlock: [part.id_SousBlock],
          }));
        }
      }
    }catch(e){
      console.error('partenaires');
    }
    try{
      const temoignages = this.sousBlock.temoignage;
      if(temoignages.length !== 0) {
        for(const tem of temoignages){
          temoignagesInit.push(this.fb.group({
            id: [tem.id],
            version: [tem.version],
            titre: [tem.titre],
            contenu: [tem.contenu],
            auteur: [tem.auteur],
            pathPhoto: [tem.pathPhoto],
            id_SousBlock: [tem.id_SousBlock]
          }));
        }
      }
    }catch(e){
      console.error('temoignages');
    }

    try{
      this.ecoleForm = this.fb.group({
        ecoleInfos: this.fb.group({
          nom: [this.sousBlock.nom],
          typeEtablissement: [this.sousBlock.typeEtablissement],
          refSousBlock: [this.sousBlock.refSousBlock],
          presentation: [this.sousBlock.presentation],
        }),
        adresse: this.fb.group({
          boitePostal: [this.sousBlock.adresse.boitePostal],
          email: [this.sousBlock.adresse.email],
          pays: [this.sousBlock.adresse.pays],
          ville: [this.sousBlock.adresse.ville],
          quartier: [this.sousBlock.adresse.quartier],
          adresseGeographique: [this.sousBlock.adresse.adresseGeographique],
          siteWeb: [this.sousBlock.adresse.siteWeb],
        }),
        telephones: telephonesInit,
        chiffres: chiffresInit,
        partenaires: partenairesInit,
        temoignages: temoignagesInit,
      });
    }catch(e){
      this.ecoleForm = this.fb.group({
        ecoleInfos: this.fb.group({
          nom: [''],
          typeEtablissement: [''],
          refSousBlock: [''],
          presentation: [''],
        }),
        adresse: this.fb.group({
          boitePostal: [''],
          email: [''],
          pays: [''],
          ville: [''],
          quartier: [''],
          adresseGeographique: [''],
          siteWeb: [''],
        }),
        telephones: telephonesInit,
        chiffres: chiffresInit,
        partenaires: partenairesInit,
        temoignages: temoignagesInit,
      });
      console.error('form init error');
    }
    console.log('ecole', this.ecoleForm);
  }
  
  get telephones(){
    return this.ecoleForm.get('telephones') as FormArray;    
  }

  addTelephone(){
    this.telephones.push(this.fb.group({
      id: [null],
      version: [0],
      type: [''],
      numero: ['']
    }));  
  }

  deleteTelephone(i){
    this.telephones.removeAt(i);
  }

  get chiffres(){
    return this.ecoleForm.get('chiffres') as FormArray;    
  }

  addChiffre(){
    this.chiffres.push(this.fb.group({
      id: [null],
      version: [0],
      titre: [''],
      chiffre: [''],
      description: [''],
      sousBlock: [this.sousBlock]
    }));  
  }

  deleteChiffre(i){
    this.chiffres.removeAt(i);
  }

  get partenaires(){
    return this.ecoleForm.get('partenaires') as FormArray;    
  }

  addPartenaire(){
    this.partenaires.push(this.fb.group({
      id: [null],
      version: [0],
      raisonSocial: [''],
      sieWebPatenaire: [''],
      pathLogo: [''],
      id_SousBlock: [this.sousBlock.id]
    }));  
  }

  deletePartenaire(i){
    this.partenaires.removeAt(i);
  }

  get temoignages(){
    return this.ecoleForm.get('temoignages') as FormArray;    
  }

  addTemoignage(){
    this.temoignages.push(this.fb.group({
      id: [null],
      version: [0],
      titre: [''],
      contenu: [''],
      auteur: [''],
      pathPhotoCouverture: [''],
      id_SousBlock: [this.sousBlock.id]
    }));  
  }

  deleteTemoignage(i){
    this.temoignages.removeAt(i);
  }

  onSubmit(){
    try{
      if((this.sousBlock === undefined) || (this.sousBlock === null)){
        this.sousBlocksS.ajoutSousBlock(this.convSousBlockNew(this.ecoleForm))
      .subscribe(
        (data) => {
          this.sousBlock = data.body;
          this.search();
          
        }
        );
      }else{
      this.sousBlocksS.modifierSosusBlock(this.convSousBlock(this.ecoleForm))
      .subscribe(
        (data) => {
          // this.sousBlock = data.body;
          // let chiffres = this.convChiffre(this.ecoleForm);
          // for(let chiffre of chiffres){
          //   // chiffre.setSousBlock(this.sousBlock);
          //   this.chiffresS.ajoutChiffre(chiffre).subscribe();
          // }
          // 
          console.log("SOUS BLOCK", this.sousBlock);
          this.search();
          
        }
      );
      }
    }catch(e){console.error('submit sous block', e);}
  }

  convSousBlockNew (fg: FormGroup): SousBlock{
    return new SousBlock(
      null,
      0,
      fg.value['ecoleInfos'].nom,
      fg.value['ecoleInfos'].typeEtablissement,
      '',
      fg.value['ecoleInfos'].presentation,
      '',
      [],
      '',
      fg.value['adresse'],
      fg.value['telephones'],
      this.detailBlock,
      [],
      [],
      [],
      this.detailBlock.block.id,
      );
  }
  convSousBlock (fg: FormGroup): SousBlock{
    return new SousBlock(
      this.sousBlock.id,
      this.sousBlock.version,
      fg.value['ecoleInfos'].nom,
      fg.value['ecoleInfos'].typeEtablissement,
      this.sousBlock.refSousBlock,
      fg.value['ecoleInfos'].presentation,
      this.sousBlock.description,
      this.sousBlock.pathPhotoCouverture,
      this.sousBlock.pathLogo,
      fg.value['adresse'],
      fg.value['telephones'],
      this.sousBlock.detailBlock,
      fg.value['chiffres'],
      fg.value['partenaires'],
      fg.value['temoignages'],
      this.sousBlock.detailBlock.block.id,
      );
  }
  convChiffre (fg: FormGroup): Chiffre[]{
    let chiffres: Chiffre[] = [];
    for(const elt of fg.value['chiffres']){
      chiffres.push(elt);
    }
    return chiffres;
  }
  convPartenaire (fg: FormGroup): Partenaire[]{
    let partenaires: Partenaire[] = [];
    for(const elt of fg.value['partenaires']){
      partenaires.push(elt);
    }
    return partenaires;
  }
  convTemoignage (fg: FormGroup): Temoignage[]{
    let temoignages: Temoignage[] = [];
    for(const elt of fg.value['temoignages']){
      temoignages.push(elt);
    }
    return temoignages;
  }
}
