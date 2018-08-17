import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {Block} from '../../shared/models/block';
import {BlockService} from '../../core/services/blocks/block.service';

@Component({
  selector: 'app-list-blocks',
  templateUrl: './list-blocks.component.html',
  styleUrls: ['./list-blocks.component.scss']
})
export class ListBlocksComponent implements OnInit {
  blocks: Block[] = [];
  selectedBlock: Block;
  defaultPhoto: any = '/assets/placeholder-image.jpg';
  @ViewChild('imagebg') imagebg: ElementRef;

  constructor(private router: Router, private blockService: BlockService) {}

  ngOnInit() {
    this.fetchBlocks();
  }

  fetchBlocks() {
    this.blockService.getAllBlocks()
      .subscribe(data => {
        this.blocks = data.body;
      });
  }
  onViewBlock(block: Block) {
    this.selectedBlock = block;
    this.router.navigate(['/site/blocks', block.id]);
  }
  /*
    Le bouton s'abonner de la page d'accueil
   */
  onSabonner(block: Block) {
    this.selectedBlock = block;
    this.router.navigate(['/site/abonnement', 'prix', block.id ]);
  }
}
