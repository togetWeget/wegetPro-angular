import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-competence-formation',
  templateUrl: './competence-formation.component.html',
  styleUrls: ['./competence-formation.component.scss']
})
export class CompetenceFormationComponent implements OnInit {
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
