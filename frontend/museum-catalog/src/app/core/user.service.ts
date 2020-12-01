import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  constructor(
   public db: AngularFirestore
 ){
 }


  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.default.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }
}