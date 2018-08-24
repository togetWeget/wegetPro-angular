import { Component, OnInit, ViewChild,
	ElementRef } from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details-compte-admin',
  templateUrl: './details-compte.component.html',
  styleUrls: ['./details-compte.component.scss']
})
export class DetailsCompteComponent implements OnInit {
  @ViewChild('photo') photo: ElementRef;
  defaultPhoto: any = '/assets/placeholder-image.jpg';
  detailsForm: any;

  constructor(private fb: FormBuilder) {
  	//
  }

  ngOnInit() {
  	this.photo.nativeElement.style.backgroundImage = 'url(' + this.getPhotoSrc() + ')';
    this.photo.nativeElement.style.backgroundSize = 'cover';
    this.photo.nativeElement.style.backgroundPosition = 'center';
    this.initForm();
  }

  getPhotoSrc(): any {
  	return '/assets/default.jpg';
    // console.log(this.domSanitizer.bypassSecurityTrustStyle(this.block.pathPhoto));
    // return (this.block.pathPhoto !== null && 
    //   this.block.pathPhoto !== undefined && this.block.pathPhoto !== '') ? 
    // this.block.pathPhoto : 
    // this.defaultPhoto;
  }

  initForm() {
  	this.detailsForm = this.fb.group({
  		
  	});
  }

}
