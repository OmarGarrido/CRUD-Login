import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import firebase from "firebase/app";
import { AngularFireAuth } from '@angular/fire/auth'

// Add the Firebase services that you want to use
import 'firebase/auth'

@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth
  ) { }



  async loginGoogle() {
    try {
      //sintaxys nueva descubierta por mi
       this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      }
    catch (error) {
      console.log(error);
    }
  }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    }
    catch (error) {
      console.log(error);

    }
  }
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return result;
    }
    catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
    }
    catch (error) {
      console.log(error);
    }
  }

  getCurrentUser() {
    try {
      return this.afAuth.authState.pipe(first()).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }

}
