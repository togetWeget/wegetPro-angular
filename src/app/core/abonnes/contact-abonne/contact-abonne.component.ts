import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material';
import {Detailblocks} from '../../../shared/models/detailblock';

@Component({
  selector: 'app-contact-abonne',
  templateUrl: './contact-abonne.component.html',
  styleUrls: ['./contact-abonne.component.scss']
})
export class ContactAbonneComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ContactAbonneComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Detailblocks) {
  }

  ngOnInit() {
  }

  onNoclieck(): void {
    this.dialogRef.close();
  }
}

