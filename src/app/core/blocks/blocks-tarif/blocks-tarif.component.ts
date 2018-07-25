import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Tarif} from '../../../shared/models/tarif/tarif';
import {TarifService} from '../../services/tarif/tarif.service';

@Component({
  selector: 'app-blocks-tarif',
  templateUrl: './blocks-tarif.component.html',
  styleUrls: ['./blocks-tarif.component.scss']
})
export class BlocksTarifComponent implements OnInit {
  tarif: Tarif;
  constructor(private tarifService: TarifService, private route: ActivatedRoute) { }

  ngOnInit() {
    /* this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.tarifService.getTarifById(+params.get('id')))
    ).subscribe(res => {
      this.tarif = res.body;
      console.log('message de detailComponent ', res.body);
    }); */

  }
  Acheter() {
    // this.router.navigate(['/block/liste', this.block.id, 'photo']);
  }


}
