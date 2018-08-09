import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss', '../layout/layout.component.scss']
})
export class AccueilComponent implements OnInit {
  title = 'GESTION DE PROJET DE MISE EN VALEUR DES COMPETENCES';

  constructor(private router: Router) { }

  ngOnInit() {

  }
  onBlock() {
    this.router.navigate(['/block']);
  }
}
