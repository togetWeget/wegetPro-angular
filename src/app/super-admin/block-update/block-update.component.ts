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
  id: any;
  block: Block;

  blockForm: any;


  constructor(private blockService: BlockService, private fb: FormBuilder,
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
  		'Ajouter un block',
  		''
  		);

  	this.block = new Block(null,null,'','','');
  	this.initForm();
  
  }

  ngOnInit() { 
  	this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
          this.id = +params.get('id');
           return this.blockService.getBlockById(this.id); 
        }
      )
    ).subscribe(res => {
  		this.block = res.body;
  		this.initForm();
        if (res.statut === 0) {
          this.initForm();
        }
      }
    );
  }

  private initForm() {
  	this.blockForm = this.fb.group({
	  	id: [this.block.id],
	  	version: [this.block.version],
	  	libelle: [this.block.libelle],
	  	description: [this.block.description],
	  	pathPhoto: [this.block.pathPhoto]
	  });
  }

  

  private convertisseur (fg: FormGroup): Block {
  	const blk = new Block(
  		fg.value['id'],
  		fg.value['version'],
  		fg.value['libelle'],
  		fg.value['description'],
  		fg.value['pathPhoto']
  		);
  	return blk;
  }

  updateBlock () {  	
  	let blockModif: Block;
  	blockModif = this.convertisseur((this.blockForm));
  	// console.log(block);
  	this.blockService.modifierBlock(blockModif)
  	.subscribe(res => {
        res.messages.toString();
        console.log(res.messages.toString());
        console.log('block  res ajoute', res.body);
        this.toastr.success('Block modifié avec succès', 'Opération réussie');
        this.router.navigate(['/super/admin/blocks']);
    });
  }

}
