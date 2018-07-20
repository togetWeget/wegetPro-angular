import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators';
import {AbonnesService} from '../../services/abonnes/abonnes.service';

@Component({
  selector: 'app-list-abonnes-block',
  templateUrl: './list-abonnes-block.component.html',
  styleUrls: ['./list-abonnes-block.component.scss']
})
export class ListAbonnesBlockComponent implements OnInit {
  abonnes: any[];
  status: number;
  constructor(private router: Router, private abonnesService: AbonnesService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.abonnesService.getAllAbonnesByBlock(params.get('block')))
    ).subscribe(res => {
      this.abonnes = res.body;
    });
  }
  getStatutMembre() {
    if (this.status === 1) {
      return 'Discuter avec cet abonné';
    } else {
      return '';
    }
  }
}
