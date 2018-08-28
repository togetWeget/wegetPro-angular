import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-compte-admin',
  templateUrl: './auth-compte.component.html',
  styleUrls: ['./auth-compte.component.scss']
})
export class AuthCompteComponent implements OnInit {
  authForm: FormGroup = null;
  constructor(private fb: FormBuilder) {
  	this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
  	this.authForm = this.fb.group({});
  }

  updateAuth(){

  }

}
