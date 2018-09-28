import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorie-ecole',
  templateUrl: './categorie-ecole.component.html',
  styleUrls: ['./categorie-ecole.component.scss']
})
export class CategorieEcoleComponent implements OnInit {
categorie=[
  {
    id:1,libelle:" Garderie,Maternel",
    img:"http://toget.ibemscreative.com/images/blocks/block7/cat1.jpg"
        
  },
  {
    id:2,libelle:"Primaire",
    img:"http://toget.ibemscreative.com/images/blocks/block7/cat1.jpg"
        
  },
  {
    id:3,libelle:"Lycée",
    img:"http://toget.ibemscreative.com/images/blocks/block7/cat2.jpg"
        
  },
  {
    id:4,libelle:"Collège",
    img:"http://toget.ibemscreative.com/images/blocks/block7/cat2.jpg"
        
  },
  {
    id:5,libelle:"Universitée et Grande Ecole",
    img:"http://toget.ibemscreative.com/images/blocks/block7/cat3.jpg"
        
  },
  {
    id:6,libelle:"Cabinet et centre de formation",
    img:"http://toget.ibemscreative.com/images/blocks/block7/cat4.jpg"
        
  },
]
  constructor() { }

  ngOnInit() {
    
  }

}

