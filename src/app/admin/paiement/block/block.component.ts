import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Block } from '../../../shared/models/Block';
import {BlockService} from '../../../core/services/blocks/block.service';

export class Blocks{
  idBlock:number;
  libelleBlock: string;
}

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  block: Block[]=[];
  constructor(private router: Router,
              private blockService:BlockService,
              public dialogRef: MatDialogRef<BlockComponent>,
              ) { }

  ngOnInit() {
    this.fetchBlocks();
  }
  fetchBlocks() {
    this.blockService.getAllBlocks()
      .subscribe(data => {
        this.block = data.body;
      });
  }
  onSuivant(){

  }
}
