import { Component, OnInit,  ViewChild, Inject,
Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {switchMap} from 'rxjs/operators';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MembreService} from '../../../core/services/personne/membre/membre.service';
import {Membre} from '../../../shared/models/personne/membres/membre';

@Component({
  selector: 'app-cover-select',
  templateUrl: './cover-select.component.html',
  styleUrls: ['./cover-select.component.scss']
})
export class CoverSelectComponent implements OnInit {
  coverPhotoForm: FormGroup;
  blockImageFile: File;
 defaultPhoto: any = '/assets/placeholder-image.jpg';
 @ViewChild('imageShowed') imageShowed;
 membre: Membre = new Membre();
 @Output('imageChange') imageChange = new EventEmitter<string>();
  public static me: CoverSelectComponent;
  defaultProfil: any = '/assets/placeholder-image.jpg';
  image: string = null;
  @ViewChild('blockImage') block_image;

  constructor(private fb: FormBuilder,
   private route: ActivatedRoute, private  router: Router,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<CoverSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private membreService: MembreService) {
      CoverSelectComponent.me = this;
      this.membre = data.membre;
      this.image = this.defaultProfil;
  }

  ngOnInit() {
    this.image = this.membre.pathPhotoCouveture;
    this.imageShowed.nativeElement.style.backgroundImage = 'url('+this.getCoverSrc()+')';
    this.imageShowed.nativeElement.style.backgroundSize = 'cover';
    this.imageShowed.nativeElement.style.backgroundPosition = 'center';
  }

  loadImage () {
    //get image
    const image = this.block_image.nativeElement;
    if(image.files && image.files[0]) {
      let file = image.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.image = reader.result + '';
          this.imageShowed.nativeElement.style.backgroundImage = 'url('+this.getCoverSrc()+')';
        };
        reader.onerror = (error: any) => {
        }
    }
    //show image
  }

  getCoverSrc(): any {
    return (this.image !== null &&
      this.image !== undefined &&
      this.image !== '') ?
      this.image :
      this.defaultProfil;
  }

  onSubmit() {
    const image = this.block_image.nativeElement;
    if (image.files && image.files[0]) {
      this.blockImageFile = image.files[0];
    }
    const imageFile: File = this.blockImageFile;
    this.membreService.enregistrerPhotoCouverture(imageFile, this.membre.login)
      .subscribe(event => {
        console.log('Le fichier est completement charger!', event);
        this.imageChange.emit(this.membre.login);
        /* if (event.type === HttpEventType.UploadProgress) {
           const percentDone = Math.round(100 * event.loaded / event.total);
           console.log(`Le fichier ${percentDone}% charger.`);
         } else if (event instanceof HttpResponse) {
           console.log('Le fichier est completement charger!');
         }*/
         this.dialogRef.close();
      });
  }

  initForm() {
    this.coverPhotoForm = this.fb.group({
      blkImg: ['']
    });
  }

  annuler() {
    this.dialogRef.close();
  }

}
