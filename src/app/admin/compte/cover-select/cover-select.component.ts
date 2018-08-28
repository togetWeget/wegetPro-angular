import { Component, OnInit,  ViewChild, Inject,
Output} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {switchMap} from 'rxjs/operators';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-cover-select',
  templateUrl: './cover-select.component.html',
  styleUrls: ['./cover-select.component.scss']
})
export class CoverSelectComponent implements OnInit {
  coverPhotoForm: FormGroup;
  blockImageFile: File;
  imageShowed: any = '/assets/placeholder-image.jpg';
  public static me: CoverSelectComponent;
  @ViewChild('blockImage') block_image;

  constructor(private fb: FormBuilder,
   private route: ActivatedRoute, private  router: Router,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<CoverSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      CoverSelectComponent.me = this;
  }

  ngOnInit() {
  }

  loadImage () {
    //get image
    const image = this.block_image.nativeElement;
    if(image.files && image.files[0]) {
      let file = image.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageShowed = reader.result;
        };
        reader.onerror = (error: any) => {
        }
    }
    //show image
  }

  onSubmit() {
    const image = this.block_image.nativeElement;
    if (image.files && image.files[0]) {
      this.blockImageFile = image.files[0];
    }
    const imageFile: File = this.blockImageFile;
    // this.blockService.enregistrerPhoto(imageFile, this.block.libelle)
      // .subscribe(event => {
        // console.log('Le fichier est completement charger!', event);
        /* if (event.type === HttpEventType.UploadProgress) {
           const percentDone = Math.round(100 * event.loaded / event.total);
           console.log(`Le fichier ${percentDone}% charger.`);
         } else if (event instanceof HttpResponse) {
           console.log('Le fichier est completement charger!');
         }*/
         // this.dialogRef.close();
      // });
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
