import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modif-photo-membre',
  templateUrl: './modif-photo.component.html',
  styleUrls: ['./modif-photo.component.scss']
})
export class ModifPhotoComponent implements OnInit {
  has_changed: boolean = null;
  constructor() {
  	this.restorePoto();
  }

  ngOnInit() {
  }

  restorePoto() {
  	this.has_changed = false;
  }

  modifierPhoto() {

  }

}
