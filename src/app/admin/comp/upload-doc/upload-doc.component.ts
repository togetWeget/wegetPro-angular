import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, FormControl,Validators,FormArray } from '@angular/forms';
import { UploadDoc } from '../../../shared/models/upload-doc';

@Component({
  selector: 'app-upload-doc',
  templateUrl: './upload-doc.component.html',
  styleUrls: ['./upload-doc.component.scss']
})
export class UploadDocComponent implements OnInit {
  uploadDocForm:FormGroup;
  uploadDoc: UploadDoc[]=[];
  active :boolean;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.initForm();

  }
  initForm(){
  	this.uploadDocForm = this.fb.group({
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
  removeDocument(){
  	this.active=false;
  }

}
