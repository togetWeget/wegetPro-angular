import { Component, OnInit, Input } from '@angular/core';
import { SousBlock } from '../../../shared/models/sous-block';

@Component({
  selector: 'app-page-ecole',
  templateUrl: './page-ecole.component.html',
  styleUrls: ['./page-ecole.component.scss']
})
export class PageEcoleComponent implements OnInit {
@Input('ecole') ecole:SousBlock;

  constructor() { }

  ngOnInit() {
  }

}
