import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pub-haut',
  templateUrl: './pub-haut.component.html',
  styleUrls: ['./pub-haut.component.scss']
})
export class PubHautComponent implements OnInit {
  multiple=[
    "/assets/images/banque.png",
    "/assets/images/sococe.png",
    "/assets/images/prepa.png",
    "/assets/images/yup.png"
  ];

  constructor() { }

  ngOnInit() {
  }

}
