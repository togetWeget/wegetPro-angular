import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/internal/operators';
import {BlockService} from '../../services/blocks/block.service';
import {MessageService} from '../../services/message.service';
import {Block} from '../../../shared/models/Block.model';

@Component({
  selector: 'app-block-liste',
  templateUrl: './block-liste.component.html',
  styleUrls: ['./block-liste.component.scss']
})
export class BlockListeComponent implements OnInit {
  title = 'la liste des Blocks';
  blocks: Block[] = [];
  block: Block;
  selectedBlock: Block;
  messageSucces: string;
  messageServiceErreur: string;
  statut: number;
  oblock: Observable<Block[]>;
  searchBlockSource = new BehaviorSubject<string>('');
  pathNullImage = './assets/images/image3.jpg';

  constructor(private blockService: BlockService, private router: Router, public snackBar: MatSnackBar,
              private  messageService: MessageService) {
  }

  ngOnInit() {
    this.blockService.blockFiltre$
      .subscribe(text => {
        this.search(text);
        console.log('text recuperer', text);
      });
    this.oblock = this.searchBlockSource.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(mc => mc ? this.blockService.rechercheBlockParMc(mc)
        : this.blockService.rechercheBlockParMc(' '))
  );


    this.toutsLesBlocks();
    this.blockService.blockCreer$.subscribe(res => {
        this.blocks.push(res.body);
        this.messageSucces = res.messages.toString();
        this.snackBar.open(this.messageSucces, '', {
          duration: 3000
        });
      }
    );
    this.blockService.blockModif$.subscribe(res => {
        this.blocks[this.findSelectedBlockIndex()] = res.body;
        this.messageSucces = res.messages.toString();
        this.snackBar.open(this.messageSucces, '', {
          duration: 3000
        });
      }
    );
    this.blockService.blockSupprime$.subscribe(
      res => {
        let index: number;
        index = this.findSelectedBlockIndex();
        this.blocks = this.blocks.filter((val, i) => i !== index);
        this.messageSucces = res.messages.toString();
        this.snackBar.open(this.messageSucces, '', {
          duration: 3000
        });
      });
    this.messageService.message$.subscribe(msg => {
        this.messageServiceErreur = msg.toString();
        this.closeMessage();
      }
    );
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
    this.router.navigate(['block/liste', block.id]);
  }

  search(mc: string) {
    this.searchBlockSource.next(mc);
  }

  closeMessage() {
    setTimeout(() => {
      this.messageServiceErreur = '';
    }, 5000);
  }
}
