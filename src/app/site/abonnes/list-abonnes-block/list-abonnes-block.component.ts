import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {AbonnesService} from '../../../core/services/abonnes/abonnes.service';
import {BlockService} from '../../../core/services/blocks/block.service';
import {SousBlockService} from '../../../core/services/sous-block.service';
import {ContactAbonneComponent} from '../contact-abonne/contact-abonne.component';
import {MatDialog} from '@angular/material';
import {Detailblock} from '../../../shared/models/detailblock';
import {SousBlock} from '../../../shared/models/sous-block';


@Component({
  selector: 'app-list-abonnes-block',
  templateUrl: './list-abonnes-block.component.html',
  styleUrls: ['./list-abonnes-block.component.scss']
})
export class ListAbonnesBlockComponent implements OnInit {
  abonnes: Detailblock[] = [];
  sousblock: SousBlock[]=[];
  @Input() typeblock: string ='';
  status: number;
  selectedAbonne: Detailblock;

  constructor(private router: Router,
              private abonnesService: AbonnesService,
              private sousBlockService: SousBlockService,
              private blockService: BlockService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params:ParamMap) =>
        this.blockService.getBlockById(+params.get('id')))
    ).subscribe(res=>{
      this.typeblock= res.body.typeBlock;
      switch (this.typeblock){
        case "ecole":
        this.fetchAllSousBlock();
        break;
        default:
        this.fetchAllCompetence();
      }
    });
  }

  fetchAllCompetence(){
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.abonnesService.getAllAbonnesByBlock(+params.get('id')))
    ).subscribe(res => {
      this.abonnes = res.body;
      console.log('les abonnes de ListAbonnesBlockComponent', res.body);
    });
  }
  fetchAllSousBlock(){
    this.route.paramMap.pipe(
      switchMap((params: ParamMap)=>
        this.sousBlockService.getDetailBlockByBlock(+params.get('id')))
    ).subscribe(res=>{
      this.sousblock = res.body;
      console.log('Les sous-block du block sont',res.body);
    });
  }
}