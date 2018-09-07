import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
public uri: any;
  constructor() { }

  ngOnInit() {
  }
  
  geturi(param){
		this.uri = param;
		alert(this.uri);
	  }

}
