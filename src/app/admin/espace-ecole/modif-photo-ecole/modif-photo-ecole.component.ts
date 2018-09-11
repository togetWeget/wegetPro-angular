import {
  Component, OnInit, ViewChild,
  ElementRef, Input, Output, EventEmitter
} from '@angular/core';
import {
  FormBuilder, FormGroup, FormControl,
  Validators, FormArray
} from '@angular/forms';
import {Detailblock} from '../../../shared/models/detailblock';
import {Resultat} from '../../../shared/models/resultat';
import {Personne} from '../../../shared/models/personne/membres/personne';
import {Membre} from '../../../shared/models/personne/membres/membre';
import {AbonnesService} from '../../../core/services/abonnes/abonnes.service';
import {MembreService} from '../../../core/services/personne/membre/membre.service';
import {OutilsService} from '../../../core/services/outils.service';
import {CvPersonne} from '../../../shared/models/personne/cv-personne';
import {Telephone} from '../../../shared/models/personne/membres/telephone';
import {Entreprise} from '../../../shared/models/personne/entreprise';
import {TypeStatut} from '../../../shared/models/personne/type-statut';
import {LangueParle} from '../../../shared/models/personne/cv-personne/langueParle';
import {Contrat} from '../../../shared/models/personne/membres/contrat';
import {Adresse} from '../../../shared/models/adresse/adresse';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-modif-photo-ecole',
  templateUrl: './modif-photo-ecole.component.html',
  styleUrls: ['./modif-photo-ecole.component.scss']
})
export class ModifPhotoEcoleComponent implements OnInit {
has_changed: boolean = null;
  @Output('imageChange') imageChange = new EventEmitter<string>();
  @ViewChild('filephoto') filephoto;
  @ViewChild('photo') photo: ElementRef;
  membre: Membre = new Membre();
  defaultProfil: any = '/assets/placeholder-image.jpg';
  image: string = null;
  profilImageFile: File;

  constructor(private fb: FormBuilder,
              private membreService: MembreService,
              public outils: OutilsService,
              private toastr: ToastrService) {
  	this.restorePhoto();
    this.image = this.defaultProfil;
  }

  ngOnInit() {
  	  this.photo.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
   this.photo.nativeElement.style.backgroundSize = 'cover';
    this.photo.nativeElement.style.backgroundPosition = 'center';

    this.membreService.getMembreByLogin(localStorage.getItem('log'))
      .subscribe(res => {
        this.membre = res.body;
        if (res.status === 0) {
          // this.initForm();
        }
        this.image = this.membre.pathPhoto;
        this.photo.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
      });
  }

  loadImage () {
    //get image
    const image = this.filephoto.nativeElement;
    if(image.files && image.files[0]) {
      let file = image.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.image = reader.result + '';
        this.has_changed = true;
        this.photo.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
        };
        reader.onerror = (error: any) => {
         this.image = this.membre.pathPhoto;
        this.photo.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
        }
    }else {
      this.image = this.membre.pathPhoto;
        this.photo.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
    }
    //show image
  }

 getProfilSrc(): any {
    return (this.image !== null &&
      this.image !== undefined &&
      this.image !== '') ?
      this.image :
      this.defaultProfil;
  }

  restorePhoto() {
  	this.has_changed = false;
  	this.image = this.membre.pathPhoto;
  }

  modifierPhoto() {
  	 const image = this.filephoto.nativeElement;
    if (image.files && image.files[0]) {
      this.profilImageFile = image.files[0];
    }
    const imageFile: File = this.profilImageFile;
    // this.membreService.enregistrerPhoto(imageFile, this.membre.login)
    //   .subscribe(event => {
    //     console.log('Le fichier est completement charger!', event);
    //     this.imageChange.emit(this.membre.login);
    //     this.restorePhoto();
    //   });
  }


}
