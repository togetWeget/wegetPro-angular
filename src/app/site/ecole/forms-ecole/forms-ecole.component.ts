import { Component, OnInit, Input } from '@angular/core';
import { Formation } from '../../../shared/models/ecole/formation';
import { MatDialog } from '@angular/material';
<<<<<<< HEAD
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
=======
>>>>>>> develop
import { InfosEcoleComponent } from '../infos-ecole/infos-ecole.component';

@Component({
  selector: 'app-forms-ecole',
  templateUrl: './forms-ecole.component.html',
  styleUrls: ['./forms-ecole.component.scss','../../abonnes/profil-abonne/profil-abonne.component.scss']
})
export class FormsEcoleComponent implements OnInit {
  @Input('formation') formation : Formation;
<<<<<<< HEAD
  imageForm: string;
  cataloguePath:string;
  formulairePath:string;
  constructor(private infosDialog: MatDialog,private http:HttpClient) { }

  ngOnInit() {
    this.imageForm=this.formation.pathPhoto ? this.formation.pathPhoto : '/assets/images/formation.jpg';
    //this.cataloguePath = this.formation.
=======
  constructor(private infosDialog: MatDialog) { }

  ngOnInit() {
>>>>>>> develop
  }

  onVoirPlus(): void {
    let dialogRef = this.infosDialog.open(InfosEcoleComponent,
      {
        width: '600px',
        data: {idFormation: this.formation.id, coursContenu: this.formation.contenu}
      });
<<<<<<< HEAD
  }
  DownloadFileCatalogue():void
  {
    this.getFile("assets/cube.txt")
    .subscribe(fileData => 
      {
      let b:any = new Blob([fileData], { type: "application/pdf" });
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(b);
        return;
      }
      var url= window.URL.createObjectURL(b);
      var link = document.createElement('a');
      link.href = url;
      link.download = "help.pdf";
      link.click();
        window.open(url);
      }
    );
  }

  public getFile(path: string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/pdf',
        responseType : 'blob',
        Accept : 'application/pdf',
        observe : 'response'
      })
    };
    return this.http.get(path,httpOptions);
  }
=======
      console.log(this.formation.contenu);
  }

>>>>>>> develop
}



