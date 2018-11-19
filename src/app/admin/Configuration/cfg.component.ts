import { Component, OnInit } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { cfgService } from '../adminShared/cfg.service';
import { cfg } from '../adminShared/cfg';

@Component({
    templateUrl: './cfg.component.html',
    styleUrls: ['./cfg.component.css']
})

export class cfgComponent implements OnInit {
    theUser: string;
    menuChoice: string;
    incidents: cfg[];

    constructor(
        private userSVC: UserService,
        private router: Router,
        private incidentSVC: cfgService
    ){}
    
    logout(){
        this.userSVC.logout();
        this.router.navigate(['']);
    }

    chooseMode(mode: string){
        this.menuChoice = mode;

    }

    ngOnInit(){
        this.theUser = this.userSVC.loggedInUser;
        this.getPosts();
    }

    getPosts(){
        let dbRef = firebase.database().ref('Configuration/');
        dbRef.once('value')
        .then((snapshot)=> {
            let tmp: string[] = snapshot.val();
            this.incidents = Object.keys(tmp).map(key => tmp[key])
        });
    }

}


