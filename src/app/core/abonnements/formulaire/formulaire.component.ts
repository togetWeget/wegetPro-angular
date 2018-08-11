import { Component, OnInit } from '@angular/core';
import { AbonnementService } from '../../services/abonnements/abonnement.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Tarif } from '../../../shared/models/tarif/tarif';
import {switchMap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {
	tarif: Tarif

  constructor(private abonnementService: AbonnementService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.fetchTarifById();
  }

  fetchTarifById(){
  	this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.abonnementService.getTarifParBlockId(+params.get('id')))
    ).subscribe(res => {
      this.tarif = res.body;
    });
  }
}
