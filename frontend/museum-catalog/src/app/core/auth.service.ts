import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(
   public afAuth: AngularFireAuth
 ){}

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.default.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        return res.user.updateProfile({
          displayName: value.username
        })
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.default.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        //to try and fix the issue of logging out
        // this.afAuth.setPersistence(firebase.default.auth.Auth.Persistence.SESSION).then(_ => {
        //   return this.afAuth.signInWithEmailAndPassword(value.email, value.password);
        // });
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.default.auth().currentUser){
        this.afAuth.signOut();
        resolve();
      }
      else{
        reject();
      }
    });
  }


}