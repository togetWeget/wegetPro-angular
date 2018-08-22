import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AdminCard } from '../../../shared/views_models/admin-card';


@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss']
})
export class AdminCardComponent implements OnInit {
  @Input('adminCard') admin_card: AdminCard;
  @Output() clickOcur = new EventEmitter<string>();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  goto (url?: string, id_button?: string) {
    if (url !== null && url !== undefined && url !== '') {
  	  this.router.navigate([url]);
    }
    this.clickOcur.emit(id_button);    
  }

}
