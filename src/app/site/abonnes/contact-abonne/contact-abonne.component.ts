import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Messagerie} from '../../../shared/models/messagerie/messagerie';
import {MessagerieService} from '../../../core/services/messagerie/messagerie.service';
import {Message} from '../../../shared/models/messagerie/message';
import {Expediteur} from '../../../shared/models/messagerie/expediteur';
import {Membre} from '../../../shared/models/personne/membres/membre';

export class Personnes {
  idPersonne: number;
  nomPersonne: string;
}

@Component({
  selector: 'app-contact-abonne',
  templateUrl: './contact-abonne.component.html',
  styleUrls: ['./contact-abonne.component.scss']
})
export class ContactAbonneComponent implements OnInit {
  messageForm: FormGroup;

  constructor(private fb: FormBuilder,
              private messagerieService: MessagerieService,
              public dialogRef: MatDialogRef<ContactAbonneComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Personnes) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const pers = new Membre(this.data.idPersonne, 0, null, null, null, null, 
      null, null, false, null, null,null,null,null,null,null, 'ME', null, null, null, null, null, null, null);
    const msg = new Message(null, 0, null, null, null);
    const exp = new Expediteur(null, 0, null, null, null, null, null);
    const newMessage = new Messagerie(null, 0, pers, msg, exp);
    this.messageForm = this.fb.group(
      {
        id: [newMessage.id],
        version: [newMessage.version],
        personne: this.fb.group({
          id: [newMessage.personne.id],
          vesion: [newMessage.personne.version],
          prenom: [newMessage.personne.prenom],
          type: [newMessage.personne.type]
  }),
    message: this.fb.group({
      id: [newMessage.message.id],
      vesion: [newMessage.message.version],
      sujet: [newMessage.message.sujet],
      contenu: [newMessage.message.contenu],
      date: [newMessage.message.date]

    }),
      expediteur: this.fb.group({
      id: [newMessage.expediteur.id],
      vesion: [newMessage.expediteur.version],
      nom: [newMessage.expediteur.nom],
      prenom: [newMessage.expediteur.prenom],
      email: [newMessage.expediteur.email],
      telephone: [newMessage.expediteur.telephone],
      entreprise: [newMessage.expediteur.entreprise]
    })
  });
  }

  onNoclieck(): void {
    this.dialogRef.close();
  }

  onEnvoyerMessage() {
    let msg: Messagerie;
    msg = this.convertisseur(this.messageForm);
    this.messagerieService.ajoutMessage(msg).subscribe(res => {
      console.log('reponse de contact abonne', res.body);
    });
  }

  private convertisseur(fg: FormGroup): Messagerie {
    const msg = new Messagerie(
      null,
      0,
      fg.value['personne'],
      fg.value['message'],
      fg.value['expediteur']
    );
    return msg;
  }
}

