import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {AdminCard} from '../../../shared/views_models/admin-card';

@Component({
  selector: 'app-entete-ecole',
  templateUrl: './entete-ecole.component.html',
  styleUrls: ['./entete-ecole.component.scss']
})
export class EnteteEcoleComponent implements OnInit {

  enteteForm: FormGroup;
  admin_card: AdminCard;

  constructor(private fb: FormBuilder) {
  	this.admin_card = new AdminCard('liste des entêtes', null, null);
  }

  ngOnInit() {
  	this.initForm();
  }

  initForm(){
  	this.enteteForm = this.fb.group({

  	});
  }

}
