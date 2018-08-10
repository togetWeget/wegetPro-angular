import { Component, OnInit } from '@angular/core';
import { AdminTopZone } from '../../shared/views_models/admin-top-zone';
import { Navs } from '../../shared/views_models/navs';
import { AdminCard } from '../../shared/views_models/admin-card';
import { Block } from '../../shared/models/Block.model';
import {BlockService} from '../../core/services/blocks/block.service';

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

  constructor(private blockService: BlockService) {
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

}
