import { Component, OnInit } from '@angular/core';
import { AdminTopZone } from '../../shared/views_models/admin-top-zone';
import { Navs } from '../../shared/views_models/navs';
import { WidgetInfo } from '../../shared/views_models/widget-info';
import { Observable, Subject } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Messagerie } from '../../shared/models/messagerie/messagerie';
import { MessagerieService } from '../../core/services/messagerie/messagerie.service';
import { Detailblock } from '../../shared/models/detailblock';
import {AbonnesService} from '../../core/services/abonnes/abonnes.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  top_zone: AdminTopZone = null;
  widget1: WidgetInfo = null;
  widget2: WidgetInfo = null;
  widget3: WidgetInfo = null;
  widget4: WidgetInfo = null;
  nonLu$: Observable<number>;
  nbVues$: Observable<number>;
  dblk: Detailblock;
  nbVues: number = 0;

  constructor(private messagerieService:MessagerieService,
    private abonneService: AbonnesService) {
    this.nonLu$ = this.messagerieService.nonLusSubject$;
    this.nbVues$ = this.abonneService.nbVueSubject$;
    this.nonLu$.subscribe();
    this.nbVues$.subscribe();
  	this.top_zone = new AdminTopZone (
  		'Tableau de bord', 
  		'Tableau de bord',
  		[
  			new Navs('Accueil', '/admin'),
  		],
  		new Navs ('Tableau de bord', ''),
  		'home',
  	);

  	this.widget1 = new WidgetInfo (
  		'Nombre de visiteurs',
  		5,
  		'user',
  		'blue',
  		''
  	);
  	this.widget2 = new WidgetInfo (
  		'Nombre de messages reçus',
  		2,
  		'envelope',
  		'red',
  		''
  	);

    this.abonneService.getAbonnesByLog(localStorage.getItem('log'))
      .subscribe((res:any)=> {
          this.dblk = res.body;    
          this.nbVues = this.dblk[0].nombreVue;
          this.abonneService.setNbVues(this.nbVues);
        this.messagerieService.findNonLus(this.dblk[0].membre.id);
      });
      
  }

  ngOnInit() {
  }

}
