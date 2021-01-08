import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { auth } from 'firebase-tools';
import { User } from 'firebase-tools';
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable()
export class AuthService {
  public user: User;
  constructor(
    public afAuth: AngularFireAuth
  ) { }

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
