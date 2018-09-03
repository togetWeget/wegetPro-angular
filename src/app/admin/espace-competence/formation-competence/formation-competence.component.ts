import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formation-competence',
  templateUrl: './formation-competence.component.html',
  styleUrls: ['./formation-competence.component.scss']
})
export class FormationCompetenceComponent implements OnInit {
	diplomes=[];
  constructor() {

  }

  ngOnInit() {
  	this.diplomes=[
		{id:1, name:'CEPE'},
		{id:2, name:'BEPC'},
		{id:3, name:'CAP'},
		{id:4, name:'BEP'},
		{id:5, name:'BAC'},
		{id:6, name:'BTS'},
		{id:7, name:'DUT'},
		{id:8, name:'DEUG'},
		{id:9, name:'LICENCE'},
		{id:10, name:'MAITRISE'}
	];
  }

}
