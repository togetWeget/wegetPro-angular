import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Blocks} from '../../../shared/models/blocks/Block.model';
import {BlockService} from '../../services/blocks/block.service';

@Component({
  selector: 'app-list-blocks',
  templateUrl: './list-blocks.component.html',
  styleUrls: ['./list-blocks.component.scss']
})
export class ListBlocksComponent implements OnInit {
  blocks: Blocks[] = [];
  statut: number;
  selectedBlock: Blocks;
  block: Blocks;
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
  onViewBlock(block: Blocks) {
    this.selectedBlock = block;
    this.router.navigate(['/blocks', block.id]);
  }
}
