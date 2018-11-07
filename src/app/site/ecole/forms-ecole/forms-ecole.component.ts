import { Component, OnInit, Input } from '@angular/core';
import { Formation } from '../../../shared/models/ecole/formation';
import { MatDialog } from '@angular/material';
import { InfosEcoleComponent } from '../infos-ecole/infos-ecole.component';

@Component({
  selector: 'app-forms-ecole',
  templateUrl: './forms-ecole.component.html',
  styleUrls: ['./forms-ecole.component.scss','../../abonnes/profil-abonne/profil-abonne.component.scss']
})
export class FormsEcoleComponent implements OnInit {
  @Input('formation') formation : Formation;
  constructor(private infosDialog: MatDialog) { }

  ngOnInit() {
  }

  onVoirPlus(): void {
    let dialogRef = this.infosDialog.open(InfosEcoleComponent,
      {
        width: '600px',
        data: {idFormation: this.formation.id, coursContenu: this.formation.contenu}
      });
      console.log(this.formation.contenu);
  }

}



