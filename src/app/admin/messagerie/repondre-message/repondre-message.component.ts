import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Messagerie } from '../../../shared/models/messagerie/messagerie';
import { Personne } from '../../../shared/models/personne/membres/personne';
import { Expediteur } from '../../../shared/models/messagerie/expediteur';
import { MessagerieService } from '../../../core/services/messagerie/messagerie.service';

@Component({
  selector: 'app-repondre-message',
  templateUrl: './repondre-message.component.html',
  styleUrls: ['./repondre-message.component.scss']
})
export class RepondreMessageComponent implements OnInit {
  message:Messagerie;
  repondreForm: FormGroup;

  constructor(private messagerieService:MessagerieService,
    private route:ActivatedRoute, 
    private router:Router, 
    private fb: FormBuilder) { }

  ngOnInit() {
  	this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.messagerieService.getMessageById(+params.get('id')))
    ).subscribe(res => {
      this.message = res.body;
      this.initForm();
    });
  }

  initForm(){
  	this.repondreForm = this.fb.group({
  		id: [null],
  		version: [0],
  		sujet: [''],
  		contenu: [''],
  		date: [null],
  		status: [true]
  	});
  }

  convertisseur(fg: FormGroup): Messagerie{
  	return new Messagerie(
  		this.message.id,
  		this.message.version,
  		this.message.personne,
  		fg.value,
  		this.message.expediteur
  	);
  }

  onSubmit(){
  	this.messagerieService.repondreMessage(this.convertisseur (this.repondreForm))
  	.subscribe((data: any)=> {
  		this.router.navigate([`/admin/messagerie/liste_message`]);
  	}
  	);
  }

}
