import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, FormControl,Validators,FormArray } from '@angular/forms';
import { UploadDoc } from '../../../shared/models/upload-doc';

@Component({
  selector: 'app-documents-competence',
  templateUrl: './documents-competence.component.html',
  styleUrls: ['./documents-competence.component.scss']
})
export class DocumentsCompetenceComponent implements OnInit {
  uploadDocs: UploadDoc[]=[];
 @Input() active:boolean =false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {


  }

  ajouterDocument() { 
    this.active=true;
  }

}
