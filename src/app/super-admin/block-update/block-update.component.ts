import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {BlockService} from '../../core/services/blocks/block.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { AdminTopZone } from '../../shared/views_models/admin-top-zone';
import { Navs } from '../../shared/views_models/navs';
import { AdminCard } from '../../shared/views_models/admin-card';
import { Block } from '../../shared/models/block';
import * as $ from 'jquery';
window["$"] =$;
window["jQuery"] = $;
import "froala-editor/js/froala_editor.pkgd.min.js";
import {Resultat} from '../../shared/models/Resultat';
import {LoginService} from '../../core/services/personne/membre/login.service';


@Component({
  selector: 'app-super-admin-block-update',
  templateUrl: './block-update.component.html',
  styleUrls: ['./block-update.component.scss']
})
export class BlockUpdateComponent implements OnInit {
  top_zone: AdminTopZone = null;
  admin_card: AdminCard = null;
  editor_options: Object = {
	  height: 250
	};
  id: number;
  block: Block;

  blockForm: FormGroup;
  resultat: Resultat<Block>;
  succesMessage: string;

  constructor( private fb: FormBuilder, private blockService: BlockService,
  	private toastr: ToastrService, private router: Router,
  	private route: ActivatedRoute) {
  	this.top_zone = new AdminTopZone (
  		'Blocks',
  		'',
  		[
  			new Navs('Accueil', '/super/admin'),
  			new Navs('Blocks', '/super/admin/blocks'),
  		],
  		new Navs ('Ajouter', ''),
  		'home',
  	);

  	this.admin_card = new AdminCard(
  		'Modifier un block',
  		''
  		);

  	}

  ngOnInit() {
  	this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = +params.get('id');
        console.log('message de ngOinit pour recuperer id', +params.get('id'));

        return this.blockService.getBlockById(this.id);

          }
      )
    ).subscribe(res => {
      this.resultat = res;
      this.block = res.body;
      console.log('dans la methode suscribe de block editer component', res.body);
      if (res.status===0) {
        this.initForm();
      }


      }
    );
  }
  onSubmit () {
    let blkModif: Block;
    blkModif = this.convertisseur(this.blockForm);
    this.blockService.modifierBlock(blkModif)
      .subscribe(res => {
        console.log('block est modifier', res.body);
        this.toastr.success('Block modifié avec succès', 'Opération réussie');
        this.router.navigate(['/super/admin/blocks']);
      });
  }

  private initForm() {
  	this.blockForm = this.fb.group({
	  	id: [this.block.id],
	  	version: [this.block.version],
	  	libelle: [this.block.libelle],
	  	description: [this.block.description],
	  	pathPhoto: [this.block.pathPhoto],
      typeBlock: [this.block.typeBlock]
	  });
  }



  private convertisseur (fg: FormGroup): Block {
  	const blk = new Block(
  		fg.value['id'],
  		fg.value['version'],
  		fg.value['libelle'],
  		fg.value['description'],
  		fg.value['pathPhoto'],
      fg.value['typeBlock']
  		);
  	return blk;
  }


}
