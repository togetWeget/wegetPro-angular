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
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {MembreService} from '../../../core/services/personne/membre/membre.service';
import {Membre} from '../../../shared/models/personne/membres/membre';
import {OutilsService} from '../../services/outils.service';
import * as $ from 'jquery';


/**
 * 
 */
export class SaveFile {
  constructor(
    public file?: File,
    public file_content?: any,
    public filename?: string, 
    public extension?: string, 
    ){}
}

/**
 * [Component description]
 * @param {['./save-files.component.scss']}} {  selector [description]
 */
@Component({
  selector: 'app-save-files',
  templateUrl: './save-files.component.html',
  styleUrls: ['./save-files.component.scss']
})
export class SaveFilesComponent implements OnInit {
	titre: string = "Gestionnaire de fichiers";
  multiple: boolean;
  type: string = "";
  url: string = "";
  callback_submit: any;
  filename: string = "";
  name: string = "";
  tab_ext_images: string[] = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ai', '.eps'];
  tab_ext_pdf: string[] = ['.pdf'];
  tab_ext_docs_office: string[] = ['.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx'];
  tab_ext_docs_other: string[] = ['.zip', '.rar', '.txt'];
  tab_ext_videos: string[] = ['.webm', '.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.ogg', '.mp4',
   '.m4p', '.m4v', '.3gp', '.avi', '.mov', '.mkv'];
  tab_ext_audios: string[] = ['.mp3', '.m4a', '.mpa', '.acc', '.oga'];
  tab_blacklist: string[] = ['.jar', '.exe', '.rar', '.ru', '.py', '.bat', '.cmd', '.vb', '.vba', '.vbs', '.c', 
  '.js', '.psd', '.dll', '.h', '.java', '.ts', '.node'];
  max_upload_size: number = 128;


  coverPhotoForm: FormGroup;
  save_files: SaveFile[] = [];

 defaultPhoto: any = '/assets/placeholder-image.jpg';
  public static me: SaveFilesComponent;
  defaultProfil: any = '/assets/placeholder-image.jpg';
  @ViewChild('blockImage') block_image;
  @ViewChild('blockImages') block_images;
  @ViewChild('blockImagesAdd') block_images_add;

  saveFiles$: Observable<SaveFile[]>;
  saveFilesSubject$ = new BehaviorSubject<string>('');

  constructor(private fb: FormBuilder,
   private route: ActivatedRoute, private  router: Router,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<SaveFilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private membreService: MembreService, public outils: OutilsService,
    private http: HttpClient, private _sanitizer: DomSanitizer) {
      SaveFilesComponent.me = this;
      (this.data.titre)? this.titre = this.data.titre : null;
      (this.data.type)? this.type = this.data.type : null;
      (this.data.url)? this.url = this.data.url : null;
      (this.data.filename)? this.filename = this.data.filename : null;
      (this.data.name)? this.name = this.data.name : null;
      (this.data.multiple)? this.multiple = this.data.multiple : false;
      (this.data.callback_submit)? this.callback_submit = this.data.callback_submit : false;

  }

  ngOnInit() {
    this.saveFiles$ = this.saveFilesSubject$.pipe(
  		debounceTime(300),
  		// distinctUntilChanged(),
  		switchMap(d => new Observable<SaveFile[]>((obs)=> {
  			obs.next(this.save_files);
  		}))
  	);
  }

  getAllFiles(save_files: SaveFile[]): File[]{
    let files: File[] = [];
    let cp: number = 0;
      try{
        for(let save_file of save_files){
            files[cp] = save_file.file;
            cp++;
        }
      }catch(e){}
    return files;
  }
  getAllFilesName(save_files: SaveFile[]): string[]{
    let filenames: string[] = [];
    let cp: number = 0;
      try{
        for(let save_file of save_files){
            filenames[cp] = save_file.file.name;
            cp++;
        }
      }catch(e){}
    return filenames;
  }
  getAllFilesExtensions(save_files: SaveFile[]): string[]{
    let fileextension: string[] = [];
    let cp: number = 0;
      try{
        for(let save_file of save_files){
            fileextension[cp] = this.getFileExtension(save_file.file.name);
            cp++;
        }
      }catch(e){}
    return fileextension;
  }

  getSommeFilesSize(files: File[]): number{
    let somme = 0;
    try{
      for(const f of files){
        somme += f.size;
      }
    }catch(e){};
    return somme;
  } 

  getSommeSaveFilesSize(files: SaveFile[]): number{
    let somme = 0;
    try{
      for(const f of files){
        somme += f.file.size;
      }
    }catch(e){};
    return somme;
  } 

  uploadsCorrectSize(files: File[]): boolean{
    return (this.getSommeFilesSize(files) + this.getSommeSaveFilesSize(this.save_files)) <= (this.max_upload_size * 1024 * 1024);
  }

  getAllFilesSize(save_files: SaveFile[]): number[]{
    let filesizes: number[] = [];
    let cp: number = 0;
    for(let save_file of save_files){
      try{
        filesizes[cp] = save_file.file.size;
        cp++;
      }catch(e){}
    }
    return filesizes;
  }

  search(){
  	this.saveFilesSubject$.next(Date.now()+'');
  }

  loadFiles(){
    const files_input = (this.multiple)? this.block_images.nativeElement : this.block_image.nativeElement;
    if (files_input.files && files_input.files[0]) {
      let files = files_input.files;
      this.save_files = [];
      if(this.uploadsCorrectSize(files)){
        this.chargementFiles(files);
      }else{
        this.toastr.error(`La taille maximale des fichiers ne doit pas dépasser ${this.max_upload_size} Mo`, "Echec de chargement");
        this.search();
      }
    }
  }

  // recuptImgs(file){ let compt = file.target.files.length; for(let i=0; i< compt; i++){ 
  //   this.ImgVar[i] = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file.target.files[i])); 
  // } }

  private isGoodExtension(file: File): boolean {
    let status: boolean = false;
    let status_tab: boolean[] = [];
    let cp: number = 0;
    const extension: string = this.getFileExtension(file.name);
    if(this.type === '' || this.type === undefined || this.type === null ){
      if(!this.outils.arrayContain(this.tab_blacklist, extension)){
        return true;
      }  
    }
    if(this.outils.arrayContain(this.tab_blacklist, extension)){
      return false;
    }
    if(this.outils.stringContain(this.type, 'image/*')){
      if(!this.outils.arrayContain(this.tab_ext_images, extension)){
        status_tab[cp] = false;
        cp++;
      }else{
        status_tab[cp] = true;
        cp++;
      }
    }
    if(this.outils.stringContain(this.type, 'audio/*')){
      if(!this.outils.arrayContain(this.tab_ext_audios, extension)){
        status_tab[cp] = false;
        cp++;
        }else{
        status_tab[cp] = true;
        cp++;
      }
    }
    if(this.outils.stringContain(this.type, 'video/*')){
      if(!this.outils.arrayContain(this.tab_ext_videos, extension)){
        status_tab[cp] = false;
        cp++;
        }else{
        status_tab[cp] = true;
        cp++;
      }
    }
    if(!this.outils.stringContain(this.type, extension)){
      status_tab[cp] = false;
      cp++;
    }else{
      status_tab[cp] = true;
      cp++;
    }

    for(let i=0; i<status_tab.length; i++){
      status = status || status_tab[i];
    }
    return status;
  }

  private isAlreadyLoaded(file: File): boolean{
    const state: boolean = this.outils.arrayContain(this.getAllFilesName(this.save_files), file.name) && 
                !this.outils.arrayContain(this.getAllFilesSize(this.save_files), file.size);
    return state;
  }

  private chargementFiles(files: File[]){
    for(let i= 0; i < files.length; i++){
        ((file, index) => {
          if(!this.isGoodExtension(file)){
                this.toastr.error(`"${file.name}" n'est pas autorisé.`, 
                  "Fichier non autorisé");
                this.search();
            }else{
              if(!this.isAlreadyLoaded(file)){
                this.save_files.push(new SaveFile(
                  file, 
                  this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file)), 
                  file.name, 
                  this.getFileExtension(file.name)
                  ));
                this.search();
              } else {
                this.toastr.warning(`"${file.name}" a déjà été chargé`, "Détection de doublons");
                this.search();
              }
            }
        })(files[i], i);
        this.search();
      }
  }

  removeAll(){
    this.save_files = [];
    this.search();
  }

  addFiles(){
    const files_input = this.block_images_add.nativeElement;
    if (files_input.files && files_input.files[0]) {
      let files = files_input.files;
      let cp = 0;
      if(this.uploadsCorrectSize(files)){
        this.chargementFiles(files);
      }else{
        this.toastr.error(`La taille maximale des fichiers ne doit pas dépasser ${this.max_upload_size} Mo`, "Echec de chargement");
        this.search();
      }
    }
  }

  hasFiles(): boolean{
    if(this.save_files.length > 0) return true;
    return false;
  }


  delfichier(save_file: SaveFile): void{
    this.outils.arrayRemoveAt(this.save_files, save_file);
    this.search();
  }

  getFileExtension(filename: string): string {
    let extension: string = null;
    try{
      const file_parts: string[] = filename.split('.');
      const file_parts_length = file_parts.length;
      if(this.isFileHasExtension(filename)){ 
        extension = '.' + file_parts[file_parts_length - 1];
      } 
    }catch(e){
      console.error('getFileExtension', e);
    }
    return extension.toLowerCase();
  }

  isFileHasExtension(filename: string): boolean{
    try{
      const file_parts: string[] = filename.split('.');
      const file_parts_length = file_parts.length;
      if(file_parts_length > 1 && file_parts[0] !== '' && file_parts[0] !== null &&
       file_parts[0] !== undefined){ 
        return true;
      }
    }catch(e){
      console.error('isFileHasExtension', e);
    }
    return false;
  }


  onSubmit() {
    if((this.url === "") || (this.url === null) || (this.url === undefined)){
      this.callback_submit(this.getAllFiles(this.save_files), this.save_files);
    }else{
      this.posterFichiers(this.getAllFiles(this.save_files))
        .subscribe(event => {
        	if(this.multiple){
          	console.log('Les fichiers sont completement chargé!', event);
        	} else{
          	console.log('Le fichier est completement chargé!', event);
        	}

           this.dialogRef.close(event);
        });
    }
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
