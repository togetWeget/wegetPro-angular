import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Block } from '../../../shared/models/block';
import { ApercuBlockComponent } from '../apercu-block/apercu-block.component';

@Component({
  selector: 'app-admin-block',
  templateUrl: './admin-block.component.html',
  styleUrls: ['./admin-block.component.scss']
})
export class AdminBlockComponent implements OnInit {
  @Input('block') block: Block;

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }

  goto(url: string){
  	this.router.navigate([url]);
  }

  viewApercu () {
  	const dialogRef = this.dialog.open(ApercuBlockComponent, {
      maxWidth: '700px',
      data: {block: this.block}
    });

    dialogRef.afterClosed().subscribe(result => {
      //
    });
  }

  deleteBlock () {
    
  }

  changeImage () {

  }

}
