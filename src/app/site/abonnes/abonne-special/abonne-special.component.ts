import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import{Detailblock} from '../../../shared/models/detailblock';
import { Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-abonne-special',
  templateUrl: './abonne-special.component.html',
  styleUrls: ['./abonne-special.component.scss']
})
export class AbonneSpecialComponent implements OnInit {

  @Input('abn') abn: Detailblock;
  defaultPhoto: any='/assets/placeholder-image.jpg';
  @ViewChild('imagebg') imagebg:ElementRef;
  tableNom:string[]=[];
  nomAffiche:string;

  constructor(private router: Router) { }

  ngOnInit() {
      this.imagebg.nativeElement.style.backgroundImage = 'url(' + this.getPhotoSrc() + ')';
      this.imagebg.nativeElement.style.backgroundSize = 'cover';
      this.imagebg.nativeElement.style.backgroundPosition = 'center';
      this.splitNom();
  }

  getPhotoSrc(): string {
    return (this.abn.membre.pathPhoto!== null && 
      this.abn.membre.pathPhoto !== undefined && this.abn.membre.pathPhoto!== '') ? 
      this.abn.membre.pathPhoto : 
      this.defaultPhoto;
    }

    onViewProfileAbonne(ab: any) {
	    this.router.navigate(['/site/abonnes', 'profile', this.abn.id]);
	}
splitNom(){
  if(this.abn.membre.nomComplet){
    this.tableNom=this.abn.membre.nomComplet.split(" ");
    this.nomAffiche= this.tableNom[0]+" " + this.tableNom[1];
  }
}
	newview(){
    // let CheminComplet = document.location.href;
    // const uriln = CheminComplet.split('/');
    // const rival = uriln[uriln.length - 1];
    // alert(rival);
    let u = this;
    const data: any = {
              idPersonne: this.abn.membre.id,
              idBlock: this.abn.block.id
            };
            
        console.log(data);
    $.ajax({
    url:'http://wegetback:8080/nombreVue',
    type:'put',
    contentType: 'application/json',
    data:JSON.stringify(data),
    dataType:'json',
    success: (valeur)=>{
    if(valeur.body != null){
      
      console.log(valeur);
    }
    },
    error: (err)=>{
        console.log(err);
    }

    });
  
  }

}
