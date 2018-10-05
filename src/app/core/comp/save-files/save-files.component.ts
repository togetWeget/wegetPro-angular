import { Component, OnInit,  ViewChild, Inject,
Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable, BehaviorSubject, of, Subject} from 'rxjs';
import {catchError, tap, map, switchMap, debounceTime, 
distinctUntilChanged} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import {MembreService} from '../../../core/services/personne/membre/membre.service';
import {Membre} from '../../../shared/models/personne/membres/membre';
import {OutilsService} from '../../services/outils.service';

@Component({
  selector: 'app-save-files',
  templateUrl: './save-files.component.html',
  styleUrls: ['./save-files.component.scss']
})
export class SaveFilesComponent implements OnInit {

	titre: string = "Gestionnaire de fichiers";
	multiple: boolean;
	type: string = "image";
	url: string = "";
	filename: string = "";
	name: string = "";

  coverPhotoForm: FormGroup;
  imageFiles: File[];

 defaultPhoto: any = '/assets/placeholder-image.jpg';
 @Output('imageChange') imageChange = new EventEmitter<string>();
  public static me: SaveFilesComponent;
  defaultProfil: any = '/assets/placeholder-image.jpg';
  images: string[] = [];
  @ViewChild('blockImage') block_image;
  @ViewChild('blockImages') block_images;

  images$: Observable<string[]>;
  imagesSubject$ = new BehaviorSubject<string>('');

  constructor(private fb: FormBuilder,
   private route: ActivatedRoute, private  router: Router,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<SaveFilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private membreService: MembreService, public outils: OutilsService,
    private http: HttpClient) {
      SaveFilesComponent.me = this;
      (this.data.titre)? this.titre = this.data.titre : null;
      (this.data.type)? this.type = this.data.type : null;
      (this.data.url)? this.url = this.data.url : null;
      (this.data.filename)? this.filename = this.data.filename : null;
      (this.data.name)? this.name = this.data.name : null;
      (this.data.multiple)? this.multiple = this.data.multiple : false;

  }

  ngOnInit() {
  	this.images$ = this.imagesSubject$.pipe(
  		debounceTime(300),
  		distinctUntilChanged(),
  		switchMap(d => new Observable<string[]>((obs)=> {
  			obs.next(this.images);
  		}))
  	);
  }

  search(){
  	this.imagesSubject$.next(Date.now()+'');
  }

  loadImages () {
    //get image
    const images = (this.multiple)? this.block_images.nativeElement : this.block_image.nativeElement;
    if (images.files && images.files[0]) {
      let files = images.files;
      this.images = [];
      for(let i= 0; i < files.length; i++){
      	((file, index) => {
	      	let reader = new FileReader();
	      	reader.readAsDataURL(file);
	      	reader.onload = () => {
	          this.images[index] = reader.result + '';
	          this.search();
	        }
	        reader.onerror = (error: any) => {
	          this.search();
	        }
      	})(files[i], i);
      }
    }
    
    //show image
  }

  onSubmit() {

    const images = (this.multiple)? this.block_images.nativeElement : this.block_image.nativeElement;
    if (images.files && images.files[0]) {
      this.imageFiles = images.files;
    }
    this.posterFichiers(this.imageFiles)
      .subscribe(event => {
      	if(this.multiple){
        	console.log('Les fichiers sont completement chargé!', event);
      	} else{
        	console.log('Le fichier est completement chargé!', event);
      	}

         this.dialogRef.close(event);
      });
  }

  posterFichiers(imageFiles: File[]){
  	const formData: FormData = new FormData();
  	for(let img of imageFiles){
    	formData.append(this.name, img, this.filename);
  	}
  	return this.http.post(this.url, formData);
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
