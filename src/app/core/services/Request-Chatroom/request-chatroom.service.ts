import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;


@Injectable({
  providedIn: 'root'
})
export class RequestChatroomService {
  public valeurs: any = [];

  constructor() {
  }

// Creation et envoie de données dans firebase
  CreateSendData(url, data) {

    return firebase.database().ref(url).set(data);

  }

// Recuperer Tous les elements du Json firebase
  getAll(url) {
  
       return firebase.database().ref(url);

        


  }

// Recuperer un element par son ID et l'url
  getSingle(url, id: any) {

    return new Promise(
      (resolve, reject) => {

        firebase.database().ref(url + '/' + id).once('value').then(
          (data: DataSnapshot) => {

            resolve(data.val());

          }, (error) => {

reject(error);

          }
        );

      }
    );

  }

// Charger un fichier dans Firebase
  uploadFile(file: File) {

    return new Promise(
      (resolve, reject) => {
		  
        const almostUniqueFileName = Date.now().toString();

        const upload = firebase.storage().ref()

          .child('images/' + almostUniqueFileName + file.name).put(file);

        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,

          () => {

            console.log('Chargement…');

          },

          (error) => {

            console.log('Erreur de chargement ! : ' + error);

            reject();

          },

          () => {

            resolve(upload.snapshot.downloadURL);

          }
        );

      }
    );

  }

// Mise à jour de données Firbase
  UpdateData(url, updates: any) {

    return new Promise(
      (resolve, reject) => {

        firebase.database().ref(url).update(updates);
      }
    );
  }

// Suppression de données de firebase retourne un promise

  RemoveData(url) {

    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(url).remove();
      }
    );
  }


// Suppression de photo de la BD firebase
  removeSinglephoto(urlphoto: any, id: any) {

    const storageRef = firebase.storage().refFromURL(urlphoto);

    storageRef.delete().then(
      () => {

        console.log('Photo removed!');

      },

      (error) => {

        console.log('Could not remove photo! : ' + error);

      }
    );
  }
}
