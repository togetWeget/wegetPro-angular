import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Block} from '../../../shared/models/Block.model';
import {BlockService} from '../../services/blocks/block.service';

@Component({
  selector: 'app-blocks-affiche',
  templateUrl: './blocks-affiche.component.html',
  styleUrls: ['./blocks-affiche.component.scss']
})
export class BlocksAfficheComponent implements OnInit {
  blocks: Block[] = [];
  statut: number;
  selectedBlock: Block;
  block: Block;

  constructor(private blockService: BlockService, private router: Router) {
  }

  ngOnInit() {
    this.toutsLesBlocks();
  }

  toutsLesBlocks() {
    this.blockService.getAllBlocks()
      .subscribe(data => {
        this.blocks = data.body;
        this.statut = data.statut;

      });

  }

  findSelectedBlockIndex(): number {
    return this.blocks.indexOf(this.selectedBlock);
  }

  onSelect(block: Block) {
    this.selectedBlock = block;
    this.router.navigate(['afficherBlock', block.id]);
  }

}
