import { Component, OnInit, Input } from '@angular/core';
import { AdminTopZone } from '../../../shared/views_models/admin-top-zone';

@Component({
  selector: 'app-top-zone',
  templateUrl: './top-zone.component.html',
  styleUrls: ['./top-zone.component.scss']
})
export class TopZoneComponent implements OnInit {

  @Input('topZone') top_zone: AdminTopZone;

  constructor() { }

  ngOnInit() {
  }

}
