import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export class Cours {
  idFormation: number;
  coursContenu: string;
}

@Component({
  selector: 'app-infos-ecole',
  templateUrl: './infos-ecole.component.html',
  styleUrls: ['./infos-ecole.component.scss']
})
export class InfosEcoleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InfosEcoleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Cours) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
