import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl,Validators,FormArray } from '@angular/forms';
import { DocCompetence } from '../../../shared/models/doc-competence';

@Component({
  selector: 'app-documents-competence',
  templateUrl: './documents-competence.component.html',
  styleUrls: ['./documents-competence.component.scss']
})
export class DocumentsCompetenceComponent implements OnInit {
  docCompetenceForm:FormGroup;
  docCompetences: DocCompetence[]=[];
  active:boolean =false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.initForm();

  }
  initForm(){
  	this.docCompetenceForm = this.fb.group({
		id: [null],
		version: [0],
		docPath: [''],
		titre: [''],
		description: [''],
		membre:['']	    
  		
  	})

  }

  onSubmit(){
  	
  }

  ajouterDocument() { 
    this.active=true;
  }

  removeDocument(){
  	this.active=false;
  }

}
