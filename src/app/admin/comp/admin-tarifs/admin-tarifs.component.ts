import { Component, OnInit, Input } from '@angular/core';
import { AdminTarif } from '../../../shared/views_models/admin-tarif';
import { Tarif } from '../../../shared/models/tarif/tarif';
import * as $ from 'jquery'; 
window["$"] =$; 
window["jQuery"] = $;
import "froala-editor/js/froala_editor.pkgd.min.js";


@Component({
  selector: 'app-admin-tarifs',
  templateUrl: './admin-tarifs.component.html',
  styleUrls: ['./admin-tarifs.component.scss']
})
export class AdminTarifsComponent implements OnInit {
  @Input('tarif') tarif: Tarif;

  constructor() { }

  ngOnInit() {
  }

}
