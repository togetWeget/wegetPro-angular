import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminTopZone } from '../../shared/views_models/admin-top-zone';
import { Navs } from '../../shared/views_models/navs';
import { AdminCard } from '../../shared/views_models/admin-card';
import { Block } from '../../shared/models/block';
import {BlockService} from '../../core/services/blocks/block.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery'; 
window["$"] =$; 
window["jQuery"] = $;
import "froala-editor/js/froala_editor.pkgd.min.js";

@Component({
  selector: 'app-super-admin-block-add',
  templateUrl: './block-add.component.html',
  styleUrls: ['./block-add.component.scss']
})
export class BlockAddComponent implements OnInit {
  top_zone: AdminTopZone = null;
  admin_card: AdminCard = null;
  editor_options: Object = {
	  height: 250
	};
  blockForm = this.fb.group({
  	id: [''],
  	version: [''],
  	libelle: [''],
  	description: [''],
  	pathPhoto: ['']
  });


  constructor(private blockService: BlockService, private fb: FormBuilder,
  	private toastr: ToastrService, private router: Router) {
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
  
  }

  ngOnInit() {
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

  ajouterBlock () {  	
  	this.blockService.ajoutBlock(this.convertisseur((this.blockForm)))
  	.subscribe((res: any) => {
        res.messages.toString();
        console.log(res.messages.toString());
        console.log('block  res ajoute', res.body);
        this.router.navigate(['/super/admin/blocks/tarifs/', res.body.id]);
    });
  }

}
