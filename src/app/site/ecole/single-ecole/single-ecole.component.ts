import { Component, OnInit, Input } from '@angular/core';
import { SousBlock } from '../../../shared/models/sous-block';

@Component({
  selector: 'app-single-ecole',
  templateUrl: './single-ecole.component.html',
  styleUrls: ['./single-ecole.component.scss']
})
export class SingleEcoleComponent implements OnInit {
  @Input('ecole') ecole:SousBlock;

  constructor() { }

  ngOnInit() {
  }
  onViewEcole(){

  }
  onContactEcole(){
  	
  }
}
