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
import { LnlFilesManagerService, ParamsModel, FileManagerModel } from 'lnl-files-manager';
import {OutilsService} from '../../services/outils.service';

@Component({
  selector: 'app-save-file2',
  templateUrl: './save-file2.component.html',
  styleUrls: ['./save-file2.component.scss']
})
export class SaveFile2Component implements OnInit {
	files: FileManagerModel[] = [];
	titre: string = "Gestionnaire de fichiers";
	multiple: boolean;
  accept: string = "";
  name: string = "";
  url: string = "";
  max_upload_size: number = 128;
  params: ParamsModel[] = []; 
  must_return: boolean = null;

  constructor(private fmService: LnlFilesManagerService,
   private route: ActivatedRoute, private  router: Router,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<SaveFile2Component>,
    @Inject(MAT_DIALOG_DATA) public data: any, public outils: OutilsService,
    private http: HttpClient) {
    this.must_return = false;
    this.multiple = false;
  	(this.data.titre)? this.titre = this.data.titre : null;
  	(this.data.name)? this.name = this.data.name : null;
    (this.data.multiple)? this.multiple = this.data.multiple : false;
    (this.data.accept)? this.accept = this.data.accept : null;
    (this.data.params)? this.params = this.data.params : null;
    (this.data.must_return)? this.must_return = this.data.must_return : null;
    (this.data.url)? this.url = this.data.url : null;

    // this.params = [
    //   new ParamsModel('firstname', 'John'),
    //   new ParamsModel('lastname', 'Doe')
    // ];

  }
  
  ngOnInit(){
    
  }
 
  send(){
  	// let allFiles: FileManagerModel[] = this.fmService.concatArrays(files, files2);
    if(!this.must_return){
      this.fmService.submit(this.url, 
        this.fmService.buildFormData(this.files, this.params, this.multiple))
      .subscribe(data => {
        this.dialogRef.close(data);
      });
    }else{
      this.dialogRef.close(this.files);
    }
  }

  handleFiles(event){
    this.files = event;
    console.log('FILES', event);
  }
 
  handleErrors(event){
  	this.toastr.error(event);
    console.log('ERRORS', event);
  }

  closeModal(){
    this.dialogRef.close();
  }
}
