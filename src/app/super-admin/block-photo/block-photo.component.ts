import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {Block} from '../../shared/models/block';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {BlockService} from '../../core/services/blocks/block.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-block-photo',
  templateUrl: './block-photo.component.html',
  styleUrls: ['./block-photo.component.scss']
})
export class BlockPhotoComponent implements OnInit {
  block: Block;
  blkPhotoForm: FormGroup;
  blockImageFile: File;
  imageShowed: any = '/assets/placeholder-image.jpg';
  public static me: BlockPhotoComponent;
  @ViewChild('blockImage') block_image;


  constructor(private blockService: BlockService, private fb: FormBuilder,
   private route: ActivatedRoute, private  router: Router,
    public dialogRef: MatDialogRef<BlockPhotoComponent>, 
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.block = data.block;
      BlockPhotoComponent.me = this;
  }

  ngOnInit() {
    // this.route.paramMap.pipe(switchMap((params: ParamMap) =>
    //   this.blockService.getBlockById(+params.get('id'))))
    //   .subscribe(res => {
    //     this.block = res.body;

    //   });
    this.initForm();
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
    this.blockService.enregistrerPhoto(imageFile, this.block.libelle)
      .subscribe(event => {
        console.log('Le fichier est completement charger!', event);
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
    this.blkPhotoForm = this.fb.group({
      blkImg: ['']
    });
  }

  annuler() {
    this.dialogRef.close();
  }
}
