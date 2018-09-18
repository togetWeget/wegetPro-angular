import { Component, OnInit, Input } from '@angular/core';
import { Experience } from '../../../../shared/models/personne/cv-personne/experience';

@Component({
  selector: 'app-experience-profil',
  templateUrl: './experience-profil.component.html',
  styleUrls: ['./experience-profil.component.scss']
})
export class ExperienceProfilComponent implements OnInit {
  @Input('experience') experience: Experience[]
  constructor() { }

  ngOnInit() {
  }

}
