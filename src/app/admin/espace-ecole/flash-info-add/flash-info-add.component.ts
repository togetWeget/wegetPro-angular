import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SousBlock } from '../../../shared/models/sous-block';
import { SousBlockService } from '../../../core/services/sous-block.service';
import { FlashInfoService } from '../../../core/services/flash-info.service';
import { FlashInfo } from '../../../shared/models/flash-info';

@Component({
  selector: 'app-flash-info-add',
  templateUrl: './flash-info-add.component.html',
  styleUrls: ['./flash-info-add.component.scss']
})
export class FlashInfoAddComponent implements OnInit {

	flashForm: FormGroup;
	sousBlock: SousBlock;

  constructor(private fb: FormBuilder, private sousBlockS: SousBlockService,
  	public dialogRef: MatDialogRef<FlashInfoAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private flashInfoS: FlashInfoService) { }

  ngOnInit() {
	  	this.initForm();
  	this.sousBlockS.getSousBlockByBlock(this.data.id)
  	.subscribe(response => {
  		this.sousBlock = response.body;
	  	this.initForm();
  	});
  }

  initForm(){
  	try{
	  	this.flashForm = this.fb.group({
	  		id: [null],
	  		version: [0],
	  		contenu: [''],
	  		etat: [true],
	  		date: [''],
	  		sousBlock: [this.sousBlock]
	  	});
  	}catch(e){
  		console.log('initForm error');
  	}
  }

  handleSubmit(){
  	this.flashInfoS.ajoutFlashInfo(this.convertisseur(this.flashForm))
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
  		fg.value['sousBlock']
  		);
  }

}
