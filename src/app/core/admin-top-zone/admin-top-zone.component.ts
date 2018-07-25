import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-top-zone',
  templateUrl: './admin-top-zone.component.html',
  styleUrls: ['./admin-top-zone.component.scss']
})
export class AdminTopZoneComponent implements OnInit {

  @Input() wprc_titre: string;
  @Input() wprc_sous_titre: string;
  @Input() wprc_navs: string[];
  @Input() wprc_active_nav: string;
  @Input() wprc_fa: string;

  constructor() { }

  ngOnInit() {
  }

}
