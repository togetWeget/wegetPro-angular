import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router,Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';
import { Detailblock } from '../../../shared/models/detailblock';


@Component({
  selector: 'app-list-abonnes',
  templateUrl: './list-abonnes.component.html',
  styleUrls: ['./list-abonnes.component.scss']
})
export class ListAbonnesComponent implements OnInit {
  abonnes:Detailblock[]=[];
  status: number;
  p:number=0;
  ville:string;
  competence:string;
  valeur:string;
  total:number=0;

  constructor(private router: Router,
              private abonnesService: AbonnesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>{
      if(!params){
        return
      }
      console.log(params);
      this.ville=params['ville'];
      this.competence=params['competence'];
      if(this.competence!='' && this.ville!=''){
        this.abonnesService.getAbonnesParRecherche(this.competence,this.ville).subscribe(res=>{
          this.abonnes=res.body;
          this.total=this.abonnes.length;
        });
      }else if(this.ville!=''){
        this.abonnesService.getAbonnesByVille(this.ville).subscribe(res=>{
          this.abonnes=res.body;
          this.total=this.abonnes.length;
        });
      }else if(this.competence!=''){
        this.abonnesService.getAbonnesByCompetence(this.competence).subscribe(res=>{
          this.abonnes=res.body;
          this.total=this.abonnes.length;
        });
      }else{
        this.abonnesService.getAllAbonnes().subscribe(res=>{
          this.abonnes=res.body;
          this.total=this.abonnes.length;
        });
      }
    });
    
  }

  goToNextPage(){
    this.p=this.p+1
    this.router.navigate(['/site/abonnes/recherche'],{ queryParams: { 'p': this.p}, queryParamsHandling: 'merge' })
  }
}
