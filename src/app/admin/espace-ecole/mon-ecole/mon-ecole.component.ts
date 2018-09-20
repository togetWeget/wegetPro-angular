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
	ecoleForm: FormGroup;
	id_block: number = null;
  detailBlock: Detailblock = null;
	// block: Block = null;
  sousBlock: SousBlock;
  sousBlock$: Observable<Resultat<SousBlock>>;
  sousBlockSubject$ =  new BehaviorSubject<string>('');

  constructor(private outils: OutilsService, private fb: FormBuilder,
  	private router: Router, private route: ActivatedRoute, 
  	private sousBlocksS: SousBlockService, private blockS: BlockService,
    private abonnesS: AbonnesService) { 
    // this.sousBlock = new SousBlock();
  }

  ngOnInit() {
  	// this.initForm();
    this.sousBlock$ = this.sousBlockSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(d => this.sousBlocksS.getSousBlockByBlock(this.id_block))
      );

  	this.route.paramMap.pipe(
  		switchMap((params: ParamMap) => {
  			this.id_block = +params.get('id');
  			return this.abonnesS.getProfilById(this.id_block);
  		})
  		).subscribe(
  		(data) => {
        this.detailBlock = data.body;    
        // this.block = this.detailBlock.block;

        // this.ecoleForm.get('block').setValue(this.block);
        this.updateForm();
      }
      );
  }

  search(){
    this.sousBlockSubject$.next(Date.now()+'');
  }

  initForm(){
    const telephonesInit = new FormArray([]);
    let soub: SousBlock;

    soub = this.sousBlock;
    if (soub.telephones.length !== 0) {
      for (const tel of soub.telephones) {
        telephonesInit.push(
          this.fb.group({
            type: tel.type,
            numero: tel.numero,
            version: tel.version,
            id: tel.id
          })
        );
      }
    }

    this.ecoleForm = this.fb.group({
      id: [null],
      version: [null],
      nom: [''],
      typeEtablissement: [''],
      refSousBlock: [''],
      presentation: [''],
      description: [''],
      pathPhoto: this.fb.array([
        this.fb.control('')
      ]),
      pathLogo: [''],
      adresse: this.fb.group({
        boitePostal: [''],
        email: [''],
        pays: [''],
        ville: [''],
        quartier: [''],
        adresseGeographique: [''],
        siteWeb: ['']
      }),
      telephones: this.fb.array([
        this.fb.group({
            type: [''],
            numero: [''],
            version: [0],
            id: [null]
          })
        ]),
      // telephones: telephonesInit,
      detailBlock: [this.detailBlock]
    });
  }


  telephoneBody(){
    return this.fb.group({
      id: [0],
      version: [0],
      type: [''],
      numero: ['']
    });
  }

  convertToSousBlock(){
    const sousBloc = new SousBlock(
      this.ecoleForm.value.id,
      this.ecoleForm.value.version,
      this.ecoleForm.value.nom,
      this.ecoleForm.value.typeEtablissement,
      this.ecoleForm.value.refSousBlock,
      this.ecoleForm.value.presentation,
      this.ecoleForm.value.description,
      this.ecoleForm.value.pathPhoto,
      this.ecoleForm.value.pathLogo,
      this.ecoleForm.value.adresse,
      this.ecoleForm.value.telephones,
      this.ecoleForm.value.detailBlock
      );
    return sousBloc;
  }

  updateForm(){
    this.sousBlock$.subscribe(d => {
          // console.log('CONV Av', d);
          this.sousBlock = d.body[0];
          if(d.body[0] === null || d.body[0] === undefined){
             this.sousBlock = new SousBlock(); 
          }
          let adresse_const: any = null;
          const telephonesInit = new FormArray([]);

          try{
            let soub: SousBlock;
            soub = this.sousBlock;
            if (soub.telephones.length !== 0) {
              for (const tel of soub.telephones) {
                telephonesInit.push(
                  this.fb.group({
                    type: tel.type,
                    numero: tel.numero,
                    version: tel.version,
                    id: tel.id
                  })
                );
              }
            }
          }catch(e){
            console.error('no sous block', e);
          }

            try{
            adresse_const = this.fb.group({
              boitePostal: [this.sousBlock.adresse.boitePostal],
              email: [this.sousBlock.adresse.email],
              pays: [this.sousBlock.adresse.pays],
              ville: [this.sousBlock.adresse.ville],
              quartier: [this.sousBlock.adresse.quartier],
              adresseGeographique: [this.sousBlock.adresse.adresseGeographique],
              siteWeb: [this.sousBlock.adresse.siteWeb]
            });
            }catch(e){
            console.error('no adresse',e);
          }
          // this.ecoleForm = null;
          try{
          this.ecoleForm = this.fb.group({
            id: [this.sousBlock.id],
            version: [this.sousBlock.version],
            nom: [this.sousBlock.nom],
            typeEtablissement: [this.sousBlock.typeEtablissement],
            refSousBlock: [this.sousBlock.refSousBlock],
            presentation: [this.sousBlock.presentation],
            description: [this.sousBlock.description],
            pathPhoto: this.fb.array([
              this.fb.control('')
            ]),
            pathLogo: [this.sousBlock.pathLogo],
            adresse: adresse_const,
            telephones: telephonesInit,
            detailBlock: [this.detailBlock]
          });
          // console.log('CONV Av',this.ecoleForm.value);
        }catch(e){
          console.error('error form',e);
        }
        });
  }

  update() {
    this.sousBlocksS.modifierSosusBlock(this.convertToSousBlock())
    .subscribe((data)=> {
      this.search();
      this.updateForm();
    })
  }

  get telephones(){
    if(this.ecoleForm !== undefined || this.ecoleForm !== null){
      return this.ecoleForm.get('telephones') as FormArray;
    } else {
      return null;
    }
  }

  addTelephone() {   
    (<FormArray>this.ecoleForm.get('telephones')).push(
      this.fb.group({
        id: [null],
        version: [0],
        type: [''],
        numero: ['']

      })
    );
  }

  deleteTelephone(id: any){
    this.telephones.removeAt(id);
  }


}
