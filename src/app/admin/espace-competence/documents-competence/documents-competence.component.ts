import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, FormControl,Validators,FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import { OutilsService } from '../../../core/services/outils.service';
import { DocumentAddComponent } from '../../espace-competence/document-add/document-add.component';
import { UploadDoc } from '../../../shared/models/upload-doc';
import { AdminCard } from '../../../shared/views_models/admin-card';
import { Membre } from '../../../shared/models/personne/membres/membre';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';
import {MembreService} from '../../../core/services/personne/membre/membre.service';
import { Detailblock } from '../../../shared/models/detailblock';
import { PersonalButton } from '../../../shared/views_models/personal-button';
import { SaveFilesComponent } from '../../../core/comp/save-files/save-files.component';
import { SaveFile2Component } from '../../../core/comp/save-file2/save-file2.component';
import { DocumentCompetence } from '../../../shared/models/document-competence';
import { DocumentCompetenceService } from '../../../core/services/document-competence.service';
import { Resultat } from '../../../shared/models/resultat';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { LnlFilesManagerService, ParamsModel, FileManagerModel } from 'lnl-files-manager';

@Component({
  selector: 'app-documents-competence',
  templateUrl: './documents-competence.component.html',
  styleUrls: ['./documents-competence.component.scss']
})
export class DocumentsCompetenceComponent implements OnInit {
  uploadDocs: UploadDoc[]=[];
  @Input() active:boolean =false;
  admin_card: AdminCard;
  params: ParamsModel[] = [];
  detailblock: Detailblock;
  membre: Membre;
  id: number;
  documents: DocumentCompetence[] = [];
  documents$: Observable<Resultat<DocumentCompetence[]>>;
  documentsSubject$ = new BehaviorSubject<string>('');

  constructor(private fb: FormBuilder, public outils: OutilsService, private dialog: MatDialog,
    private membreService: MembreService, 
    private abonnesService: AbonnesService,
    private route: ActivatedRoute, private docS: DocumentCompetenceService,
    private _sanitizer: DomSanitizer) { 
    this.documents$ = this.documentsSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(d => this.docS.getAllDocumentCompetencesParPersonne(this.membre.id))
      );
    this.admin_card = new AdminCard(
      'Mes documents',
      null, 
      [
      new PersonalButton('ajout', 'Ajouter', 'plus', null, 'blue')
      ]
      )
    this.membre = new Membre();
  }

  sanitize(value: string): any{
    return this._sanitizer.bypassSecurityTrustResourceUrl(value);
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>{
       this.id = +params.get('id');
     return this.abonnesService.getProfilById(this.id)
     })
    ).subscribe(res=> {
      this.detailblock = res.body;  
      this.membre = this.detailblock.membre;
      this.docS.getAllDocumentCompetencesParPersonne(this.membre.id)
      .subscribe(data => {
        try{
          this.documents = data.body;
          this.search();
        }catch(e){}
        // console.log("doc", data.body);
      });
      // if (res.status===0) {
      //      // this.initForm();
      //    }   
    });   

  }

  search(){
    this.documentsSubject$.next(Date.now()+'');
  }

  // ajouterDocument() { 
  //   this.active=true;
  // }

  handleCardClick(event){
    switch (event) {
      case "ajout":
        this.ajouterDocument();
        break;
      
      default:
        // code...
        break;
    }
  }

  ajouterDocument() {
    const dialogRef = this.dialog.open(DocumentAddComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {isNew: true, id: this.id}      
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.search(Date.now()+'');
      this.search();
      // this.search(localStorage.getItem('log'));
    });
  }

  setParams(id: number){
    this.params = [];
    this.params = [
      new ParamsModel('id', id+'')
    ];
  }

  // choseFile(doc: DocumentCompetence){
  //   this.setParams(doc.id);
  //  const dialogRef = this.dialog.open(SaveFile2Component, {
  //     maxWidth: '768px',
  //     maxHeight: '500px',
  //     data: {name: 'image_doc', multiple: false, accept: '.pdf, .doc, .docx', 
  //     filename: doc.titre, params: this.params, url: `${this.outils.getBaseUrl()}/photoDocumentCompetence`}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.search();
  //   }); 
  // }
  edit(doc: DocumentCompetence){
    const dialogRef = this.dialog.open(DocumentAddComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {isNew: false, id: this.id, doc: doc}      
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

}
