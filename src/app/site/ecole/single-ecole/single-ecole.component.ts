import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-ecole',
  templateUrl: './single-ecole.component.html',
  styleUrls: ['./single-ecole.component.scss']
})
export class SingleEcoleComponent implements OnInit {
  @Input('ecole') ecole:any;

  constructor() { }

  ngOnInit() {
  }
  onViewEcole(){

  }
  onContactEcole(){
  	
  }
}
