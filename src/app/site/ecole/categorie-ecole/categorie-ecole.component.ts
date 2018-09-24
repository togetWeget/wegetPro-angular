import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorie-ecole',
  templateUrl: './categorie-ecole.component.html',
  styleUrls: ['./categorie-ecole.component.scss']
})
export class CategorieEcoleComponent implements OnInit {
categorie=[
  {
    id:1,libelle:"Garderie, Maternel à Primaires",
    img:"http://toget.ibemscreative.com/images/blocks/block7/cat1.jpg"
        
  },
  {
    id:2,libelle:"Lycée et collège",
    img:"http://toget.ibemscreative.com/images/blocks/block7/cat2.jpg"
        
  },
  {
    id:3,libelle:"Universitée et grande école",
    img:"http://toget.ibemscreative.com/images/blocks/block7/cat3.jpg"
        
  },
  {
    id:4,libelle:"Cabinet et centre de formation",
    img:"http://toget.ibemscreative.com/images/blocks/block7/cat4.jpg"
        
  },
]
  constructor() { }

  ngOnInit() {
    
  }

}

