import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { DocumentSousBlockService } from '../../../core/services/document-sous-block.service';
import { SaveFilesComponent } from '../../../core/comp/save-files/save-files.component';
import { OutilsService } from '../../../core/services/outils.service';
import { DocumentSousBlock } from '../../../shared/models/document-sous-block';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {SousBlockService} from '../../../core/services/sous-block.service';
import { Membre } from '../../../shared/models/personne/membres/membre';
import { SousBlock } from '../../../shared/models/sous-block';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';
import {MembreService} from '../../../core/services/personne/membre/membre.service';
import { Detailblock } from '../../../shared/models/detailblock';
import { ToastrService } from 'ngx-toastr';
import { LnlFilesManagerService, ParamsModel, FileManagerModel } from 'lnl-files-manager';


@Component({
  selector: 'app-document-ecole-add',
  templateUrl: './document-ecole-add.component.html',
  styleUrls: ['./document-ecole-add.component.scss']
})
export class DocumentEcoleAddComponent implements OnInit {

  documentForm: FormGroup;
  isNew: boolean;
  detailblock: Detailblock;
  sousBlock: SousBlock;
  membre: Membre;
  id: number;
  doc: DocumentSousBlock;
  files: FileManagerModel[] = [];
  params: ParamsModel[] = [];
  
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<DocumentEcoleAddComponent>,
  	@Inject(MAT_DIALOG_DATA) private data: any, 
  	private docS: DocumentSousBlockService, 
  	private outils: OutilsService,
    private membreService: MembreService, 
    private abonnesService: AbonnesService,
    private fmService: LnlFilesManagerService,
    private sousBlockS: SousBlockService, 
    private route: ActivatedRoute, private toastr: ToastrService) {
  	this.isNew = data.isNew;
  	this.id = data.id;
    // alert(this.id);
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
     return this.sousBlockS.getSousBlockByIdDetailBlock(this.id)
     })
    ).subscribe(res=> {
      this.sousBlock = res.body;  
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
      // new ParamsModel('nom_doc', id+'')
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
		  		pathDocument: [null],
		  		sousBlock: [this.sousBlock],
		  	});
  		}catch(e){
  			this.documentForm = this.fb.group({
		  		id: [null],
		  		version: [0],
		  		titre: [''],
		  		description: [''],
		  		pathDocument: [null],
		  		sousBlock: [null],
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
		  		sousBlock: [this.sousBlock],
		  	});
  		}catch(e){
  			this.documentForm = this.fb.group({
		  		id: [null],
		  		version: [0],
		  		titre: [''],
		  		description: [''],
		  		pathDocument: [null],
		  		sousBlock: [null],
		  	});
  			console.error("initForm",e);
  		}
  	}
  }


  convertisseur(fg: FormGroup): DocumentSousBlock{
  	return new DocumentSousBlock(
  		fg.value['id'],
  		fg.value['version'],
  		fg.value['titre'],
  		fg.value['description'],
      fg.value['pathDocument'],
  		// fg.value['sousBlock']
      this.sousBlock
  		);
  }

  enregistrer(){
  	if(this.isNew){
      try{

      this.docS.ajoutDocumentSousBlock(this.convertisseur (this.documentForm))
      .subscribe((data)=>{
        this.dialogRef.close();
        // this.setParams(data.body.id);
        this.params = [
          new ParamsModel('id', data.body.id+''),
          new ParamsModel('nom_doc', data.body.titre+'')
        ];
        this.sendFiles();
      });
    }catch(e){console.error(e);}
    }else{
      this.docS.modifierDocumentSousBlock(this.convertisseur (this.documentForm))
      .subscribe((data)=>{
        // this.setParams(data.body.id);
        this.params = [
          new ParamsModel('id', data.body.id+''),
          new ParamsModel('nom_doc', data.body.titre+'')
        ];
        this.sendFiles();
      });
    }
    //requete d'enregistrement d'infos du fichier
  }

  sendFiles(){
    this.fmService.submit(`${this.outils.getBaseUrl()}/sousblockDocument`,
      this.fmService.buildFormData(this.files, this.params, true))
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
