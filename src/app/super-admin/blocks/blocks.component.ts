import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AdminTopZone } from '../../shared/views_models/admin-top-zone';
import { Navs } from '../../shared/views_models/navs';
import { AdminCard } from '../../shared/views_models/admin-card';
import { Block } from '../../shared/models/block';
import { Resultat } from '../../shared/models/resultat';
import {BlockService} from '../../core/services/blocks/block.service';
// import { ApercuBlockComponent } from './comp/apercu-block/apercu-block.component';
import { BlockPhotoComponent } from '../block-photo/block-photo.component';

@Component({
  selector: 'app-super-admin-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {
  p: number = 1;
  top_zone: AdminTopZone = null;
  admin_card: AdminCard = null;
  blocks: Block[] = [];

  constructor(private blockService: BlockService, private dialog: MatDialog) {
  	this.top_zone = new AdminTopZone (
  		'Blocks', 
  		'',
  		[
  			new Navs('Accueil', '/super/admin'),
  			new Navs('Blocks', '/super/admin/blocks'),
  		],
  		new Navs ('Liste', ''),
  		'home',
  	);

  	this.admin_card = new AdminCard(
  		'Liste des blocks',
  		'/super/admin/blocks/add'
  		);
  	this.fetchBlocks();
  }

  fetchBlocks() {
    this.blockService.getAllBlocks()
      .subscribe(data => {
        this.blocks = data.body;
      });
  }

  ngOnInit() {
  }

  handleClick(event: Resultat<Block>) {
    switch (event.messages[0]) {
      case 'image':
        this.imageModal(event.body);
        break;
      case 'apercu':
        this.apercuModal();
        break;
      case 'delete':
        this.deleteBlockModal();
        break;
      
      default:
        console.log('default');
        break;
    }
  }

  imageModal (block: Block) {
    const dialogRef = this.dialog.open(BlockPhotoComponent, {
      maxWidth: '700px',
      maxHeight: '700px',
      data: {block: block}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchBlocks();
    });
  }

  apercuModal () {
    
  }

  deleteBlockModal () {

  }

}
