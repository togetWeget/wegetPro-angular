import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { DocumentCompetenceService } from '../../../core/services/document-competence.service';
import { SaveFilesComponent } from '../../../core/comp/save-files/save-files.component';
import { OutilsService } from '../../../core/services/outils.service';
import { DocumentCompetence } from '../../../shared/models/document-competence';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { Membre } from '../../../shared/models/personne/membres/membre';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';
import {MembreService} from '../../../core/services/personne/membre/membre.service';
import { Detailblock } from '../../../shared/models/detailblock';
import { ToastrService } from 'ngx-toastr';
import { LnlFilesManagerService, ParamsModel, FileManagerModel } from 'lnl-files-manager';

@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.scss']
})
export class DocumentAddComponent implements OnInit {
  documentForm: FormGroup;
  isNew: boolean;
  detailblock: Detailblock;
  membre: Membre;
  id: number;
  doc: DocumentCompetence;
  files: FileManagerModel[] = [];
  params: ParamsModel[] = [];
  
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<DocumentAddComponent>,
  	@Inject(MAT_DIALOG_DATA) private data: any, 
  	private docS: DocumentCompetenceService, 
  	private outils: OutilsService,
    private membreService: MembreService, 
    private abonnesService: AbonnesService,
    private fmService: LnlFilesManagerService,
    private route: ActivatedRoute, private toastr: ToastrService) {
  	this.isNew = data.isNew;
  	this.id = data.id;
  	if(!this.isNew){
  		this.doc = data.doc;
  	}
  }

  ngOnInit() {
  	if(this.isNew){
  		this.initForm();
  	} else {
  		this.updateForm();
  	}
  	this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>{
       // this.id = +params.get('id');
     return this.abonnesService.getProfilById(this.id)
     })
    ).subscribe(res=> {
      this.detailblock = res.body;  
      this.membre = this.detailblock.membre;
      if (res.status===0) {
           if(this.isNew){
		  		this.initForm();
		  	} else {
		  		this.updateForm();
		  	}
         }   
    });   
  }

  setParams(id){
    this.params = [
      new ParamsModel('id', id+'')
    ];
  }


  initForm(){
  	if(this.isNew){
  		try{
		  	this.documentForm = this.fb.group({
		  		id: [null],
		  		version: [0],
		  		titre: [''],
		  		description: [''],
		  		pathDocument: [''],
		  		membre: [this.membre],
		  	});
  		}catch(e){
  			this.documentForm = this.fb.group({
		  		id: [null],
		  		version: [0],
		  		titre: [''],
		  		description: [''],
		  		pathDocument: [''],
		  		membre: [null],
		  	});
  			console.error("initForm",e);
  		}
  	}
  }

  updateForm(){
  	if(!this.isNew){
  		try{
		  	this.documentForm = this.fb.group({
		  		id: [this.doc.id],
		  		version: [this.doc.version],
		  		titre: [this.doc.titre],
		  		description: [this.doc.description],
		  		pathDocument: [this.doc.pathDocument],
		  		membre: [this.membre],
		  	});
  		}catch(e){
  			this.documentForm = this.fb.group({
		  		id: [null],
		  		version: [0],
		  		titre: [''],
		  		description: [''],
		  		pathDocument: [''],
		  		membre: [null],
		  	});
  			console.error("initForm",e);
  		}
  	}
  }


  convertisseur(fg: FormGroup): DocumentCompetence{
  	return new DocumentCompetence(
  		fg.value['id'],
  		fg.value['version'],
  		fg.value['titre'],
  		fg.value['description'],
  		fg.value['pathDocument'],
  		fg.value['membre']
  		);
  }

  enregistrer(){
  	if(this.isNew){
	  	this.docS.ajoutDocumentCompetence(this.convertisseur (this.documentForm))
	  	.subscribe((data)=>{
	  		this.dialogRef.close();
        this.setParams(data.body.id);
        this.sendFiles();
      });
    }else{
      this.docS.modifierDocumentCompetence(this.convertisseur (this.documentForm))
      .subscribe((data)=>{
        this.setParams(data.body.id);
        this.sendFiles();
      });
    }
    //requete d'enregistrement d'infos du fichier
  }

  sendFiles(){
    this.fmService.submit(`${this.outils.getBaseUrl()}/photoDocumentCompetence`,
      this.fmService.buildFormData(this.files, this.params))
    .subscribe(data => {
        this.dialogRef.close();
      // backend response
    });
  }

  handleFiles(event){
    this.files = event;
  }

  handleErrors(event){
    this.toastr.error(event);
  }
}
