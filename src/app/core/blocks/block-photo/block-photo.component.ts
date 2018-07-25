import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Block} from '../../../shared/models/Block.model';
import {BlockService} from '../../services/blocks/block.service';

@Component({
  selector: 'app-block-photo',
  templateUrl: './block-photo.component.html',
  styleUrls: ['./block-photo.component.scss']
})
export class BlockPhotoComponent implements OnInit {
  block: Block;
  blkPhotoForm: FormGroup;
  blockImageFile: File;

  @ViewChild('blockImage') block_image;


  constructor(private blockService: BlockService, private fb: FormBuilder, private route: ActivatedRoute, private  router: Router) {

  }

  ngOnInit() {
    this.route.paramMap.pipe(switchMap((params: ParamMap) =>
      this.blockService.getBlockById(+params.get('id'))))
      .subscribe((res: any) => {
        this.block = res.body;

      });
    this.initForm();
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
      });

    this.router.navigate(['block/liste']);
  }

  initForm() {
    this.blkPhotoForm = this.fb.group({
      blkImg: ['']
    });
  }

  annuler() {
    this.router.navigate(['block/liste']);
  }
}
