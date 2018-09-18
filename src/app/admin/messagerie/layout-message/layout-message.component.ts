import { Component, OnInit } from '@angular/core';
import { AdminTopZone } from '../../../shared/views_models/admin-top-zone';
import { Navs } from '../../../shared/views_models/navs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Messagerie } from '../../../shared/models/messagerie/messagerie';
import { MessagerieService } from '../../../core/services/messagerie/messagerie.service';

@Component({
  selector: 'app-layout-message',
  templateUrl: './layout-message.component.html',
  styleUrls: ['./layout-message.component.scss']
})
export class LayoutMessageComponent implements OnInit {
  top_zone: AdminTopZone = null;
  //maxMsg:number;

  nonLu$: Observable<number>;
  constructor(private messagerieService:MessagerieService,
    private route:ActivatedRoute) {
  	this.top_zone = new AdminTopZone (
  		'Messagerie', 
  		'Messagerie',
  		[
  			new Navs('Accueil', '/admin'),
  		],
  		new Navs ('Messagerie', ''),
  		'home',
  	);
    this.nonLu$ = this.messagerieService.nonLusSubject$;
    this.nonLu$.subscribe();
  }

  ngOnInit() {
    // alert(0);
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.messagerieService.changeStatusMessage(+params.get('id')))
    // ).subscribe(res => {
    //   this.message = res.body;
    //   console.log(this.message);
    // });
  }

}