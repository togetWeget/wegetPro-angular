import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publicite',
  templateUrl: './publicite.component.html',
  styleUrls: ['./publicite.component.scss']
})
export class PubliciteComponent implements OnInit {
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
