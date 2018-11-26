import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {RequestChatroomService} from '../Request-Chatroom/request-chatroom.service';
declare const MediaRecorder: any;
@Injectable({
  providedIn: 'root'
})
export class RecordService {
	public modal: boolean;
  constructor(public firbaseRequest: RequestChatroomService) {
	  this.modal = false;
	  // this.getvideo(2,85);
  }

			getvideo(param, param2){
				this.modal = true;
				// this.streamSend(2, 8, {test: 123});
				let u = this;
				this.createsource();
				const constraints = {
						  video: { width: 500, height: 500 }, 
						  audio : true
				};
				
				let videoChunks = [];
				const video = document.getElementById('mevideo');
				const audio = document.getElementById('meaudio');
				let videosource = document.querySelector('a');

				navigator.mediaDevices.getUserMedia(constraints).
				  then((stream) => {
					  // video.srcObject = stream;
					  console.log(stream);
						
					  const mediaRecorder = new MediaRecorder(stream);
											mediaRecorder.start();
											
											
					   //const audioChunks = [];

					mediaRecorder.addEventListener("dataavailable", event => {
					  videoChunks.push(event.data);
					  
							const vd = new Blob(videoChunks);
							const dv = URL.createObjectURL(vd);
							
							let donnee: any = {videos: JSON.stringify(vd)};
							u.streamSend(param, param2, donnee);
						});
						
						 mediaRecorder.addEventListener("stop", () => {
							const videoBlob = new Blob(videoChunks);
							const videoUrl = URL.createObjectURL(videoBlob);
							// console.log(videoUrl);
							// u.download('',videoUrl);
						});        
						   setTimeout(() => {
								 mediaRecorder.stop();
							}, 10000);
				  
				  });
				  
				  
			}
			
			
			getaudio(){
					
			return new Promise((resolve, reject)=>{
				
			
				let u = this;
				this.createsource();
				const constraints = {
				  audio : true
				};
				
				let videoChunks = [];
				const audio = document.querySelector('audio');
				let videosource = document.querySelector('a');
				let stop = document.getElementById('stopButton');
				let options;
				if (MediaRecorder.isTypeSupported('video/ogg;codecs=vp9')) {
				  options = {mimeType: 'video/ogg; codecs=vp9'};
				} else if (MediaRecorder.isTypeSupported('video/ogg;codecs=vp8')) {
				   options = {mimeType: 'video/ogg; codecs=vp8'};
				}
				navigator.mediaDevices.getUserMedia(constraints).
				  then((stream) => {
					  $(".arret").show();
					  // audio.srcObject = stream;
					  const mediaRecorder = new MediaRecorder(stream, options);
											mediaRecorder.start();
											
											
					   //const audioChunks = [];

					mediaRecorder.addEventListener("dataavailable", event => {
					  videoChunks.push(event.data);
						});
						
						 mediaRecorder.addEventListener("stop", () => {
							const videoBlob = new Blob(videoChunks);
							const videoUrl = URL.createObjectURL(videoBlob);
							// u.download('',videoUrl);
							// u.stopStreamedVideo(audio);
							 resolve(videoBlob);
						});        
						   // setTimeout(() => {
								 // mediaRecorder.stop();
							// }, 3000);
							
						  stop.onclick = function() {
							mediaRecorder.stop();
							$(".arret").fadeOut();
						  }
				  
				  });
				  
			});	  
			}

	download(filename, data) {
		  let element = document.createElement('a');
		  element.setAttribute('href',data);
		  element.setAttribute('download', filename);

		  element.style.display = 'none';
		  document.body.appendChild(element);

		  element.click();

		  document.body.removeChild(element);
	}	
		
	createsource(){
	let video = document.createElement('video');	
	let audio = document.createElement('audio');	
	video.autoplay = true;
	audio.autoplay = true;	
	document.body.appendChild(video);
	document.body.appendChild(audio);
	}
  
 stopStreamedVideo(videoElem) {
		  let stream = videoElem.srcObject;
		  let tracks = stream.getTracks();

		  tracks.forEach(function(track) {
			track.stop();
		  });

		  videoElem.srcObject = null;
		}
		
	streamSend(param, param2, data){
		let date = new Date().getTime();
		let urlDataMe = "Streaming/" + param + "/" + date;
		let urlDataYou = "Streaming/" + param2 + "/" + date;
		this.firbaseRequest.CreateSendData( urlDataYou, data);
		
	}
  
	Streaming(){
		let u = this;
			let database = firebase.database().ref();
			let yourVideo = document.getElementById("mevideo");
			let friendsVideo = document.getElementById("meaudio");
			let yourId = Math.floor(Math.random()*1000000000);
			let servers = {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'}, {'urls': 'turn:numb.viagenie.ca','credential': 'webrtc','username': 'djouejoel@gmail.com'}]};
			let pc = new RTCPeerConnection(servers);
			pc.onicecandidate = (event => event.candidate? u.sendMessage(yourId, JSON.stringify({'ice': event.candidate})):console.log("Sent All Ice") );
			// pc.onaddstream = (event => yourVideo.srcObject = event.stream);
	}
	
	sendMessage(senderId, data) {
	 let database = firebase.database().ref();
	 let msg = database.push({ sender: senderId, message: data });
	 msg.remove();
	}

	// readMessage(data, yourId) {
		// let u = this;
	 // let msg = JSON.parse(data.val().message);
	 // let sender = data.val().sender;
	 // if (sender != yourId) {
	 // if (msg.ice != undefined)
	 // pc.addIceCandidate(new RTCIceCandidate(msg.ice));
	 // else if (msg.sdp.type == "offer")
	 // pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
	 // .then(() => pc.createAnswer())
	 // .then(answer => pc.setLocalDescription(answer))
	 // .then(() => u.sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})));
	 // else if (msg.sdp.type == "answer")
	 // pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
	 // }
	// }
	
	readfr(){
		let u = this;
	// firebase.database().ref();.on('child_added', u.readMessage);
		
	}
	
	// showMyFace() {
	 // navigator.mediaDevices.getUserMedia({audio:true, video:true})
	 // .then(stream => yourVideo.srcObject = stream)
	 // .then(stream => pc.addStream(stream));
	// }

	// showFriendsFace() {
	 // pc.createOffer()
	 // .then(offer => pc.setLocalDescription(offer) )
	 // .then(() => sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})) );
	// }
}
