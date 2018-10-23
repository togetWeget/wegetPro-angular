import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import {InfoMembreService} from '../info-membre/info-membre.service';
import {OutilsService} from '../outils.service';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class ConnexionUpService {
public InfoMe: any;
public timest;
public intervalset;
  constructor(private InfoM: InfoMembreService, private outils: OutilsService) { 	  
	  this.InfoM.getbylogin();
	  this.InfoMe = this.InfoM.InfoMembres;
	  }
//**********************************************************************************************************************************************  
  createsenddata(url, data) {
    return firebase.database().ref(url).set(data);
  }
  getAll(url) {
       return firebase.database().ref(url);
  }
  UpdateData(url, updates: any) {
    return new Promise(
      (resolve, reject) => {

        firebase.database().ref(url).update(updates);
      }
    );
  }
  RemoveData(url) {

    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(url).remove();
      }
    );
  }
  //********************************************************************************************************************************************
  sendconnexion(){
  
			  this.InfoM.getbylogin();
		if(localStorage.getItem("log")){
			this.intervalset = setInterval(()=>{
					this.InfoMe = this.InfoM.InfoMembres;
				if(this.InfoM.InfoMembres.id){
					 this.updatedataconnexion(); 
				}
					this.getserveurtime(); 
			},60000);
		}
					this.getallconnexion();
	}
	
	updatedataconnexion(){
		this.InfoM.getbylogin();
	  this.InfoMe = this.InfoM.InfoMembres;
	  if(this.InfoM.InfoMembres.id){ 				
				let data: any ={
								statusconnexion: 1,
								timestamp: firebase.database.ServerValue.TIMESTAMP
								};
				let url = "connexionUp/" + this.InfoM.InfoMembres.id;
				this.UpdateData(url, data);	  
		this.getallconnexion();		
			
		}
	}
	getallconnexion(){
	
		this.getAll("connexionUp").on("value", snapshot => {
		let compt = snapshot.val();
			for(let i in compt){
				this.getserveurtime(); 
				this.getAll("connexionUp/" + i).on("value", snapshot => {
					if(snapshot.val()){
						let d = new Date(snapshot.val().timestamp);
						d.setMinutes(d.getMinutes() + 5);
						let dateFinale = d.getTime();
						if(dateFinale < this.timest){
						
							let data: any ={
											statusconnexion: 0
										   };
							let url = "connexionUp/" + i;
							this.UpdateData(url, data);	
						}
					}
				});
				
			}
		});		
			
		
	}
  getserveurtime(){
  let u = this;
	firebase.database().ref("/.info/serverTimeOffset").on('value', function(offset) {
		let offsetVal = offset.val() || 0;
		u.timest = Date.now() + offsetVal;
	  });  
	}
	
	

}
