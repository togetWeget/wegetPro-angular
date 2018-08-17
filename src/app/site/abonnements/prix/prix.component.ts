import { Component, OnInit } from '@angular/core';
import {Tarif} from '../../../shared/models/tarif/tarif';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AbonnementService} from '../../../core/services/abonnements/abonnement.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-prix',
  templateUrl: './prix.component.html',
  styleUrls: ['./prix.component.scss']
})
export class PrixComponent implements OnInit {

  tarifs: Tarif[] = [];
  tarifselected: Tarif;
  constructor(private route: ActivatedRoute, private router: Router, 
    private abonnementServices: AbonnementService) { }

  ngOnInit() {
    this.featchTarif();
  }
  featchTarif() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.abonnementServices.getAlltarifsByBlocksId(+params.get('id')))
    ).subscribe(res => {
      this.tarifs = res.body;
    });
  }
  onPayer(prix: Tarif) {
    this.tarifselected = prix;
    this.router.navigate(['/abonnement', 'form', prix.idBlock]);
  }
}
