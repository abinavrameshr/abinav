import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { cfg } from './cfg';


@Injectable()

export class cfgService {
    authUser: any;

    createIncident(incident: cfg){
         this.authUser = firebase.auth().currentUser;
         let dbRef = firebase.database().ref('Configuration/');
         let newIncident = dbRef.push();
         newIncident.set({
             title: incident.title,
             content: incident.content,
             userName: this.authUser.email,
             id: newIncident.key ,
             status: "open"
         })
         .catch ((error) =>{
              alert(`failed upload: ${error}`);
        });
    }
}