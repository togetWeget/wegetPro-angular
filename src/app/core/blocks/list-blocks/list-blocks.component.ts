import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Block} from '../../../shared/models/Block.model';
import {BlockService} from '../../services/blocks/block.service';

@Component({
  selector: 'app-list-blocks',
  templateUrl: './list-blocks.component.html',
  styleUrls: ['./list-blocks.component.scss']
})
export class ListBlocksComponent implements OnInit {
  blocks: Block[] = [];
  statut: number;
  selectedBlock: Block;
  block: Block;
  constructor(private router: Router, private blockService: BlockService) {}

  ngOnInit() {
    this.fetchBlocks();
  }
  fetchBlocks() {
    this.blockService.getAllBlocks()
      .subscribe(data => {
        this.blocks = data.body;
        this.statut = data.statut;
      });
  }
  onViewBlock(block: Block) {
    this.selectedBlock = block;
    this.router.navigate(['blocks', block.libelle]);
  }
}
