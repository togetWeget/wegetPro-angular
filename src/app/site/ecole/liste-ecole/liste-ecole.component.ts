import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-ecole',
  templateUrl: './liste-ecole.component.html',
  styleUrls: ['./liste-ecole.component.scss']
})
export class ListeEcoleComponent implements OnInit {
  ecoles:any=[
  	{
  		id:1,
  		nbView:15,
  		pays:'Côte d\'Ivoire',
  		name:'IEA ABIDJAN',
  		tel:'22 42 29 37',
  		mobile:'87 01 39 05',
  		logo:'http://toget.ibemscreative.com/assets/img/unknown_user.png'
  	}
  ]
  constructor() { }

  ngOnInit() {
  }

}
