import {Component, OnInit, ViewChild} from '@angular/core';
import {LayoutComponent} from '../layout/layout.component';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  public dataRec: any = {};
  public uid_receiv;
  public pathPhoto_rec;
  public named;
  constructor(public layoutComponent: LayoutComponent, public  http: HttpClient) {

  //  this.sidnavClose();
    this.recupAllUser();
    console.log(this.dataRec);
  }

  ngOnInit() {
  }

  sidnavClose() {

  }


  SEndDiscusion() {

  }

  changeVarUser(id, pathPhoto, name) {
    this.uid_receiv = id;
    this.pathPhoto_rec = pathPhoto;
    this.named = name;

    console.log(this.uid_receiv);
    console.log(this.pathPhoto_rec);
    console.log(this.named);
  }

  recupAllUser() {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get<HttpResponse<any>>('http://localhost:8080/personnes/ME', {headers: headers, observe: 'response'}).subscribe((resul) => {
        if (resul.status === 200) {
          this.dataRec = resul.body.body;
          console.log(resul.body.body);
        } else {
          alert('Authentification incorrecte!');
          console.log(resul.body);
        }
      },
      err => {
        console.log('Error: ' + err);
        alert('Alert! erreur.');
      });
  }
}
