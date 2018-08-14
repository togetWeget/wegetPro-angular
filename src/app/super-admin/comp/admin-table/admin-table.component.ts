import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent implements OnInit {
  groupSelect: number[] = [10,25,50,100];
  groupSelected: number = 10;
  
  constructor() { }

  ngOnInit() {
  }

  copier () {

  }

  excel () {

  }

  pdf () {

  }

  imprimer () {

  }
}
