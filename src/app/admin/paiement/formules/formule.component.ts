import { Component, OnInit, Input } from '@angular/core';
import { Tarif } from '../../../shared/models/tarif/tarif';

@Component({
  selector: 'app-formule',
  templateUrl: './formule.component.html',
  styleUrls: ['./formule.component.scss']
})
export class FormuleComponent implements OnInit {
	@Input('tarif') tarif: Tarif;
    constructor() { }

    ngOnInit() {
    }

}
