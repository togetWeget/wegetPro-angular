import { Component, OnInit, Input, Output, EventEmitter,
ViewChild, ElementRef } from '@angular/core';
import { AdminTable } from '../../../shared/views_models/admin-table';
import * as jspdf from 'jspdf';   

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent<T> implements OnInit {
  groupSelect: number[] = [10,25,50,100];
  groupSelected: number = 10;
  @Input('tableOject') table_object: AdminTable<T>;
  @Output() perPage = new EventEmitter<any>();
  @ViewChild('contentToConvert') contentToConvert: ElementRef;

  constructor() { }

  ngOnInit() {
    this.perPage.emit(this.groupSelected);
  }

  copier () {

  }

  excel () {

  }

  pdf () {
    let doc = new jspdf({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });

    let specialElementHandlers = {
      '#editor': (element, renderer) => {
        return true;
      }
    };

    let content = this.contentToConvert.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 200,
      'elementHandlers': specialElementHandlers
    });

    doc.save('toget.pdf');
  }

  imprimer () {

  }

  setPerPage (val: any) {
    this.perPage.emit(this.groupSelected);
  }
  log(val: any){
    console.log(val);
  }
}
