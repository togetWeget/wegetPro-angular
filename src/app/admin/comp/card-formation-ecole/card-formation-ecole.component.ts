import { Component, OnInit, Input, Output,
EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-formation-ecole',
  templateUrl: './card-formation-ecole.component.html',
  styleUrls: ['./card-formation-ecole.component.scss']
})
export class CardFormationEcoleComponent implements OnInit {
  @Input('titre') titre: string;
  @Input('niveau') niveau: string;
  @Input('periode') periode: string;
  @Input('description') description: string;
  @Input('prix') prix: string;
  @Output('clickOcur') clickOcur = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  handleClick(id: string){
  	this.clickOcur.emit(id);
  }
}
