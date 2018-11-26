import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {OutilsService} from '../../../core/services/outils.service';
import {Formation} from '../../../shared/models/ecole/formation';
import {Cours} from '../../../shared/models/ecole/cours';
import {SousBlock} from '../../../shared/models/sous-block';
import {SousBlockService} from '../../../core/services/sous-block.service';
import {FormationEcoleService} from '../../../core/services/formation-ecole.service';
import { LnlFilesManagerService, ParamsModel, FileManagerModel } from 'lnl-files-manager';
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-formation-ecole-update',
  templateUrl: './formation-ecole-update.component.html',
  styleUrls: ['./formation-ecole-update.component.scss']
})
export class FormationEcoleUpdateComponent implements OnInit {

  formationForm: FormGroup;
  sousBlock: SousBlock;
  formation: Formation;
  params: ParamsModel[] = [];
  files: FileManagerModel[] = [];
  catalogueFiles: FileManagerModel[] = [];
  formulaireFiles: FileManagerModel[] = [];
  cp: number = 0;
  cp$: Observable<number>;
  cpS$ = new BehaviorSubject<number>(0);

  constructor(public dialogRef: MatDialogRef<FormationEcoleUpdateComponent>, 
    @Inject(MAT_DIALOG_DATA) public data, public outils: OutilsService,
    private fb: FormBuilder, private sousBlockS: SousBlockService,
    private formationS: FormationEcoleService, private fmService: LnlFilesManagerService) {

  }

  ngOnInit() {
        this.cp$ = this.cpS$.asObservable();
        this.cpS$.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap(d => new Observable<number>((observer)=>{
            observer.next(d);
          })));
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

   handleFiles(event){
    this.files = event;
    console.log('FILES', event);
  }
 
  handleErrors(event){
    console.log('ERRORS', event);
  }

  handleCatalogueFiles(event){
    this.catalogueFiles = event;
    console.log('FILES', event);
  }
 
  handleCatalogueErrors(event){
    console.log('ERRORS', event);
  }
  handleFormulaireFiles(event){
    this.formulaireFiles = event;
    console.log('FILES', event);
  }
 
  handleFormulaireErrors(event){
    console.log('ERRORS', event);
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
        pathPhoto: [this.formation.pathPhoto],
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
        pathPhoto: [''],
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
      this.params = [
        new ParamsModel('id', response.body.id+'')
      ];
        this.cp = 0;
        this.cpS$.next(this.cp);
      if(this.files.length !== 0){
        this.fmService.submit(`${this.outils.getBaseUrl()}/formationPhoto`, 
        this.fmService.buildFormData(this.files, this.params))
        .subscribe(data => {
          // backend response
          this.cp++; 
          this.cpS$.next(this.cp);
          this.cp$.subscribe(data => {
            if(data >= 3){
              this.dialogRef.close();
            }
          });
        }, error => {
          this.cp++; 
          this.cpS$.next(this.cp);
          this.cp$.subscribe(data => {
            if(data >= 3){
              this.dialogRef.close();
            }
          });
        });
      }else{
        this.cp++; 
        this.cpS$.next(this.cp);
        this.cp$.subscribe(data => {
            if(data >= 3){
              this.dialogRef.close();
            }
          });
      }

      if(this.formulaireFiles.length !== 0) {
        this.fmService.submit(`${this.outils.getBaseUrl()}/formationFormulaire`, 
          this.fmService.buildFormData(this.formulaireFiles, this.params))
          .subscribe(data => {
            // backend response
            this.cp++; 
            this.cpS$.next(this.cp);
            this.cp$.subscribe(data => {
            if(data >= 3){
              this.dialogRef.close();
            }
          });
          }, error => {
            this.cp++; 
            this.cpS$.next(this.cp);
            this.cp$.subscribe(data => {
            if(data >= 3){
              this.dialogRef.close();
            }
          });
          });
        }else{
          this.cp++;
          this.cpS$.next(this.cp);
          this.cp$.subscribe(data => {
            if(data >= 3){
              this.dialogRef.close();
            }
          });
      }

        if(this.catalogueFiles.length !== 0){
          this.fmService.submit(`${this.outils.getBaseUrl()}/formationCatalogue`, 
          this.fmService.buildFormData(this.catalogueFiles, this.params))
          .subscribe(data => {
            // backend response     
            this.cp++; 
            this.cpS$.next(this.cp);
            this.cp$.subscribe(data => {
            if(data >= 3){
              this.dialogRef.close();
            }
          });
          }, error => {
            this.cp++; 
            this.cpS$.next(this.cp);
            this.cp$.subscribe(data => {
            if(data >= 3){
              this.dialogRef.close();
            }
          });
          });
        } else{
          this.cp++; 
          this.cpS$.next(this.cp);
          this.cp$.subscribe(data => {
            if(data >= 3){
              this.dialogRef.close();
            }
          });
        }
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
      fg.value['pathPhoto'],
      fg.value['cour'],
      fg.value['sousBlock']
      );
  }
}
