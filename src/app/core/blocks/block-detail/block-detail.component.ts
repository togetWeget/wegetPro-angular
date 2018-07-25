import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Block} from '../../../shared/models/Block.model';
import {BlockService} from '../../services/blocks/block.service';


@Component({
  selector: 'app-block-detail',
  templateUrl: './block-detail.component.html',
  styleUrls: ['./block-detail.component.scss']
})
export class BlockDetailComponent implements OnInit {
  block: Block;
  pathNullImage = 'assets/photo/11-700x467.jpg';

  constructor(private blockService: BlockService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.blockService.getBlockById(+params.get('id')))
    ).subscribe(res => {
      this.block = res.body;
      console.log('message de detailComponent ', res.body);
    });

  }

  editerBlock() {
    this.router.navigate(['/block/liste', this.block.id, 'edite']);
  }

  ajouterPhoto() {
    this.router.navigate(['/block/liste', this.block.id, 'photo']);
  }

  supprimerBloc() {
    this.blockService.supprimerBlock(this.block.id)
      .subscribe(res => {
        console.log(res.messages);
      });
    this.router.navigate(['/enseignant/liste']);
  }

}
