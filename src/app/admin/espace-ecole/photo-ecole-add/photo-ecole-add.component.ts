import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { PhotoSousblockService } from '../../../core/services/photo-sousblock.service';
import { SaveFilesComponent } from '../../../core/comp/save-files/save-files.component';
import { OutilsService } from '../../../core/services/outils.service';
import { PhotoSousblock } from '../../../shared/models/photo-sousblock';
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
  selector: 'app-photo-ecole-add',
  templateUrl: './photo-ecole-add.component.html',
  styleUrls: ['./photo-ecole-add.component.scss']
})
export class PhotoEcoleAddComponent implements OnInit {
photoForm: FormGroup;
  isNew: boolean;
  detailblock: Detailblock;
  sousBlock: SousBlock;
  membre: Membre;
  id: number;
  doc: PhotoSousblock;
  files: FileManagerModel[] = [];
  params: ParamsModel[] = [];
  
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<PhotoEcoleAddComponent>,
  	@Inject(MAT_DIALOG_DATA) private data: any, 
  	private docS: PhotoSousblockService, 
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
		  	this.photoForm = this.fb.group({
		  		id: [null],
		  		version: [0],
		  		libelle: [''],
		  		description: [''],
		  		date: [null],
		  		pathPhoto: [null],
		  		pathVideo: [null],
		  		membre: [this.membre],
		  		sousBlock: [this.sousBlock],
		  	});
  		}catch(e){
  			this.photoForm = this.fb.group({
		  		id: [null],
		  		version: [0],
		  		libelle: [''],
		  		description: [''],
		  		date: [null],
		  		pathPhoto: [null],
		  		pathVideo: [null],
		  		membre: [null],
		  		sousBlock: [null],
		  	});
  			console.error("initForm",e);
  		}
  	}
  }

  updateForm(){
  	if(!this.isNew){
  		try{
		  	this.photoForm = this.fb.group({
		  		id: [this.doc.id],
		  		version: [this.doc.version],
		  		libelle: [this.doc.libelle],
		  		description: [this.doc.description],
		  		date: [this.doc.date],
		  		pathPhoto: [this.doc.pathPhoto],
		  		pathVideo: [this.doc.pathVideo],
		  		membre: [this.doc.membre],
		  		sousBlock: [this.sousBlock],
		  	});
  		}catch(e){
  			this.photoForm = this.fb.group({
		  		id: [null],
		  		version: [0],
		  		libelle: [''],
		  		description: [''],
		  		date: [null],
		  		pathPhoto: [null],
		  		pathVideo: [null],
		  		membre: [null],
		  		sousBlock: [null],
		  	});
  			console.error("initForm",e);
  		}
  	}
  }


  convertisseur(fg: FormGroup): PhotoSousblock{
  	return new PhotoSousblock(
  		fg.value['id'],
  		fg.value['version'],
  		fg.value['libelle'],
  		fg.value['description'],
  		fg.value['date'],
        fg.value['pathPhoto'],
        fg.value['pathVideo'],
        fg.value['membre'],
  		// fg.value['sousBlock']
        this.sousBlock
  		);
  }

  enregistrer(){
  	if(this.isNew){
      try{

      this.docS.ajoutPhotoSousblock(this.convertisseur (this.photoForm))
      .subscribe((data)=>{
        this.dialogRef.close();
        // this.setParams(data.body.id);
        this.params = [
          new ParamsModel('id', data.body.id+''),
          new ParamsModel('nom_doc', data.body.libelle+'')
        ];
        this.sendFiles();
      });
    }catch(e){console.error(e);}
    }else{
      this.docS.modifierPhotoSousblock(this.convertisseur (this.photoForm))
      .subscribe((data)=>{
        // this.setParams(data.body.id);
        this.params = [
          new ParamsModel('id', data.body.id+''),
          new ParamsModel('nom_doc', data.body.libelle+'')
        ];
        this.sendFiles();
      });
    }
    //requete d'enregistrement d'infos du fichier
  }

  sendFiles(){
    this.fmService.submit(`${this.outils.getBaseUrl()}/photoGallerySouBlock`,
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
