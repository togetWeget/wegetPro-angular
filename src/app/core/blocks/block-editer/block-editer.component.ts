import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup,} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Block} from '../../../shared/models/Block.model';
import {Resultat} from '../../../shared/models/Resultat';
import {BlockService} from '../../services/blocks/block.service';

@Component({
  selector: 'app-block-editer',
  templateUrl: './block-editer.component.html',
  styleUrls: ['./block-editer.component.scss']
})
export class BlockEditerComponent implements OnInit {
  id: number;
  editMode = false;
  block: Block;
  blocks: Block[];
  blockForm: FormGroup;
  resultat: Resultat<Block>;
  succesMessage: string;
  block$: Observable<Resultat<Block>>;


  constructor(private blockService: BlockService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
          this.id = +params.get('id');
          console.log('message de ngOinit pour recuperer id', +params.get('id'));
           this.editMode = params.get('id') != null;
          if (this.editMode) {
              console.log('test de edit dans ngOninit', this.editMode);
           return this.blockService.getBlockById(this.id);

          } else {
            this.newInit();
            return of(new Resultat(9, ['nouveau block '], new Block()));
          }
        }
      )
    ).subscribe(res => {
        this.resultat = res;
        this.block = res.body;
        console.log('dans la methode suscribe de blockeditercomponent', res.body);
        if (res.statut === 0) {
          this.initForm();
        }
      }
    );
  }

  onSubmit() {
    if (!this.editMode) {
      console.log('dans le onSubmit de edit', this.editMode);
      let blk: Block;
      blk = this.convertisseur(this.blockForm);
      this.blockService.ajoutBlock(blk)
        .subscribe(res => {
          this.succesMessage = res.messages.toString();
          console.log(this.succesMessage);
          console.log('block  res ajoute', res.body);
        });

    } else {
      let blkModif: Block;
      blkModif = this.convertisseur(this.blockForm);
      this.blockService.modifierBlock(blkModif)
        .subscribe(res => {
          console.log('block est modifier', res.body);

        });
    }

    console.log('block form ajouter', this.blockForm.value);
    console.log('block ajouter', this.convertisseur(this.blockForm));
    this.router.navigate(['block/liste']);

  }

  private newInit() {
    const blk = new Block(null, 0, null, null, null);
    this.blockForm = this.fb.group({
      id: [blk.id],
      version: [blk.version],
      libelle: [blk.libelle],
      description: [blk.description],
      pathPhoto: [blk.pathPhoto]
    });
  }

  private initForm() {

    this.blockForm = this.fb.group({
      id: [this.block.id],
      version: [this.block.version],
      libelle: [this.block.libelle],
      description: [this.block.description],
      pathPhoto: [this.block.pathPhoto],
    });
  }

  private convertisseur(fg: FormGroup): Block {
    const blk = new Block(
      fg.value['id'],
      fg.value['version'],
      fg.value['libelle'],
      fg.value['description'],
      fg.value['pathPhoto'],
    );
    return blk;
  }

  annuler() {

  }
}
