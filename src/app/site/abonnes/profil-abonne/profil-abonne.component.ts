import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {AbonnesService} from '../../../core/services/abonnes/abonnes.service';
import { SousBlockService } from '../../../core/services/sous-block.service';
import {ChatLiasonService} from '../../../core/services/chat-liason/chat-liason.service';
import {MatDialog} from '@angular/material';
import {ContactAbonneComponent} from '../contact-abonne/contact-abonne.component';
import {Detailblock} from '../../../shared/models/detailblock';
import { SousBlock } from '../../../shared/models/sous-block';
import { Block } from '../../../shared/models/block';
import { CursusScolaire } from '../../../shared/models/personne/cv-personne/cursusScolaire';
import { Experience } from '../../../shared/models/personne/cv-personne/experience';
import { FormationEcoleService } from '../../../core/services/formation-ecole.service';
import { Formation } from '../../../shared/models/ecole/formation';

@Component({
  selector: 'app-profil-abonne',
  templateUrl: './profil-abonne.component.html',
  styleUrls: ['./profil-abonne.component.scss']
})
export class ProfilAbonneComponent implements OnInit {
  abonne: Detailblock;
  block: Block;
  typeblock: string;
  titre:string;
  image:string;
  vues:number;
  photo:string;
  sousBlock: SousBlock;
  cursus: CursusScolaire[]=[];
  experience: Experience[]=[];
  abonnes: Detailblock[] = [];
  defaultPhoto: any = '/assets/profile-cover.jpg';
<<<<<<< HEAD
  photoCouverture: string;
  photoCouvertureArr: string[] = [];
=======
  photCouverture: string;
>>>>>>> develop
  identifiant:number;
  nomMembre:string;
  isValid:boolean;
  formation:Formation;

  constructor(private abonnesService: AbonnesService,
              private route: ActivatedRoute,
              private router: Router,
              private contactDialog: MatDialog,
			        public chatact: ChatLiasonService,
              public sbService: SousBlockService,
              public formationEcoleService: FormationEcoleService
        ) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(switchMap((params:ParamMap)=>
      this.abonnesService.getProfilById(+params.get('id')))
    ).subscribe(res=>{
      this.block=res.body.block;
      if (this.block.id===11) {
        this.fetchSousBlock();
      }else{
        this.fetchDetailblock();
      }
      this.isValid=true;
    });
  }
<<<<<<< HEAD
  /* La methode de recuperation d'un abonné */

=======
>>>>>>> develop
  fetchDetailblock(){
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.abonnesService.getProfilById(+params.get('id')))
    ).subscribe(res => {
      this.abonne = res.body;
      this.cursus = this.abonne.membre.cvPersonne.cursus;
      this.experience = this.abonne.membre.cvPersonne.experience;
<<<<<<< HEAD
      this.photoCouverture=this.getPhotoSrc();
      this.photoCouvertureArr = [this.photoCouverture];
=======
      this.photCouverture=this.getPhotoSrc();
>>>>>>> develop
      this.identifiant=this.abonne.membre.id;
      this.nomMembre=this.abonne.membre.nomComplet;
      this.typeblock =this.abonne.block.typeBlock;
      this.titre=this.abonne.block.libelle;
<<<<<<< HEAD
      this.image=this.abonne.membre.pathPhoto;
=======
      this.image=this.abonne.membre.pathPhotoCouveture;
>>>>>>> develop
      this.vues=this.abonne.nombreVue;
      this.photo=this.abonne.membre.pathPhoto;
    });
  }
<<<<<<< HEAD

  /* La methode de recupération d'un sous block */
=======
>>>>>>> develop
  fetchSousBlock(){
    this.route.paramMap.pipe(
      switchMap((params:ParamMap) =>
        this.sbService.getSousBlockByIdDetailBlock(+params.get('id'))
      )
    ).subscribe(res => {
      this.sousBlock = res.body;
      this.identifiant = this.sousBlock.detailBlock.membre.id;
      this.nomMembre = this.sousBlock.detailBlock.membre.nomComplet;
      this.typeblock = this.sousBlock.detailBlock.block.typeBlock;
      this.titre=this.sousBlock.detailBlock.block.libelle;
<<<<<<< HEAD
      this.image=this.sousBlock.pathLogo;
      this.vues=this.sousBlock.detailBlock.nombreVue;
      this.photo=this.sousBlock.pathLogo;
      this.photoCouvertureArr = this.sousBlock.pathPhotoCouverture;
      let sousBId=this.sousBlock.id;
      this.fetchAllFormationSB(sousBId);
    });
  }

  /* Les autres abonnés du block*/
=======
      this.image="";
      this.vues=this.sousBlock.detailBlock.nombreVue;
      this.photo=this.sousBlock.pathLogo;
      let sousBId=this.sousBlock.id;
      this.fetchAllFormationSB(sousBId);
        console.log(this.formation);
    });
  }
>>>>>>> develop
  fethcAllAbonnes() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.abonnesService.getAllAbonnesByBlock(+params.get('this.abonne.block.id')))
    ).subscribe(res => {
      this.abonnes = res.body;
<<<<<<< HEAD
      //console.log('les abonnes de ListAbonnesBlockComponent', res.body);
    });
  }

  /*Toutes les formations d'un sous block ecole */
  fetchAllFormationSB(numSoub:number){
    this.formationEcoleService.getFormationBySousBlock(numSoub).subscribe(res=>{
      this.formation = res.body;
      //console.log(this.formation);
=======
      console.log('les abonnes de ListAbonnesBlockComponent', res.body);
    });
  }

  fetchAllFormationSB(numSoub:number){
    this.formationEcoleService.getFormationBySousBlock(numSoub).subscribe(res=>{
      this.formation = res.body;
      console.log(this.formation);
>>>>>>> develop
    });
  }
  getPhotoSrc(): string {
    return (this.abonne.membre.pathPhotoCouveture!== null && 
      this.abonne.membre.pathPhotoCouveture !== undefined && this.abonne.membre.pathPhotoCouveture!== '') ? 
      this.abonne.membre.pathPhotoCouveture : 
      this.defaultPhoto;
  }
  onContactAbonne(): void {
    const dialogRef = this.contactDialog.open(ContactAbonneComponent,
      {
        width: '600px',
        data: {idPersonne: this.identifiant, nomPersonne: this.nomMembre}
      });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }
  handleClick(event){
    
  }
  
  activatchat(){
	this.chatact.chatload(this.identifiant, this.nomMembre, this.photo);
  }
  
}
