import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SousBlock } from '../../../shared/models/sous-block';
import { SousBlockService } from '../../../core/services/sous-block.service';
import { FlashInfoService } from '../../../core/services/flash-info.service';
import { FlashInfo } from '../../../shared/models/flash-info';


@Component({
  selector: 'app-flash-info-update',
  templateUrl: './flash-info-update.component.html',
  styleUrls: ['./flash-info-update.component.scss']
})
export class FlashInfoUpdateComponent implements OnInit {

  flashForm: FormGroup;
	sousBlock: SousBlock;
	flashInfo: FlashInfo;

  constructor(private fb: FormBuilder, private sousBlockS: SousBlockService,
  	public dialogRef: MatDialogRef<FlashInfoUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private flashInfoS: FlashInfoService) { }

  ngOnInit() {
	  	this.initForm();
  	this.sousBlockS.getSousBlockByBlock(this.data.id)
  	.subscribe(response => {
  		this.sousBlock = response.body;
  		this.flashInfoS.getFlashInfoById(this.data.fid)
  		.subscribe(resp => {
  			this.flashInfo = new FlashInfo(
  				resp.body.id,
  				resp.body.version,
  				resp.body.contenu,
  				resp.body.etat,
  				resp.body.date,
  				resp.body.sousBlock
  				);
	  		this.initForm();
  		});
  	});
  }

  initForm(){
  	try{
	  	this.flashForm = this.fb.group({
	  		id: [this.flashInfo.id],
	  		version: [this.flashInfo.version],
	  		contenu: [this.flashInfo.contenu],
	  		etat: [this.flashInfo.etat],
	  		date: [this.flashInfo.date],
	  		sousBlock: [this.sousBlock]
	  	});
  	}catch(e){
  		this.flashForm = this.fb.group({
	  		id: [null],
	  		version: [0],
	  		contenu: [''],
	  		etat: [true],
	  		date: [''],
	  		sousBlock: ['']
	  	});
  		console.log('initForm error');
  	}
  }

  handleSubmit(){
  	this.flashInfoS.modifierFlashInfo(this.convertisseur(this.flashForm))
  	.subscribe(response => {
  		this.dialogRef.close();
  	});
  }

  convertisseur (fg: FormGroup): FlashInfo{
  	return new FlashInfo(
  		fg.value['id'],
  		fg.value['version'],
  		fg.value['contenu'],
  		fg.value['etat'],
  		fg.value['date'],
  		this.sousBlock
  		);
  }

}
