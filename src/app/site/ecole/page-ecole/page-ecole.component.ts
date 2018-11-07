import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { SousBlock } from '../../../shared/models/sous-block';
import { FlashInfo } from '../../../shared/models/flash-info'
import { FlashInfoService } from '../../../core/services/flash-info.service';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';
import { SousBlockService } from '../../../core/services/sous-block.service';

@Component({
  selector: 'app-page-ecole',
  templateUrl: './page-ecole.component.html',
  styleUrls: ['./page-ecole.component.scss']
})
export class PageEcoleComponent implements OnInit {
  @Input('ecole') ecole:SousBlock;
  flashInfos: FlashInfo[]=[];
  idSbdk:number;

  constructor(private router: Router, 
              private flashInfoService: FlashInfoService,
              private route: ActivatedRoute,
              private abonnesService: AbonnesService,
              private sbService: SousBlockService) { }

  ngOnInit() {
    this.getSousblockId();
  }

  getSousblockId(){
    this.route.paramMap.pipe(
      switchMap((params:ParamMap)=>
       this.sbService.getSousBlockByIdDetailBlock(+params.get('id'))
      )
    ).subscribe(res=>{
      this.idSbdk= res.body.id;
      this.getAllFlashInfos();
    });
  }
  getAllFlashInfos(){
    this.flashInfoService.getFlashInfoBySousBlock(this.idSbdk)
     .subscribe(data =>{
      this.flashInfos= data.body;
      console.log(this.flashInfos);
     });
  }

}
