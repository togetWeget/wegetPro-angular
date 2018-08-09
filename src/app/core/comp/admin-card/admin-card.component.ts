import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminCard } from '../../../shared/views_models/admin-card';


@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss']
})
export class AdminCardComponent implements OnInit {
  @Input('adminCard') admin_card: AdminCard;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goto (url: string) {
  	this.router.navigate([url]);
  }

}
