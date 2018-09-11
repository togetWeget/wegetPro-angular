import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Messagerie } from '../../../shared/models/messagerie/messagerie';
import { MessagerieService } from '../../../core/services/messagerie/messagerie.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss']
})
export class ViewMessageComponent implements OnInit {
  message:Messagerie;

  constructor(private messagerieService:MessagerieService,
    private route:ActivatedRoute) { }


  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.messagerieService.getMessageById(+params.get('id')))
    ).subscribe(res => {
      this.message = res.body;
    });
  }

}
