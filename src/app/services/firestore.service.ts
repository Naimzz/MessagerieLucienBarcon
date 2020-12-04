import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore, public firebase: AngularFireAuth) { }

  getUserList(): Observable<User[]> {
    return this.firestore.collection<User>(`users`).valueChanges();
  }

  createUser(usersInfo): Promise<void> {
    const id = this.firestore.createId();
    const nom = usersInfo.name;
    const prenom = usersInfo.lastname;
    const login = usersInfo.login;
    const mot_de_passe = usersInfo.password;
    const mail = usersInfo.mail;
    const adresse = usersInfo.adress;
    const date_de_naissance = usersInfo.birthday;
  
    this.firebase.createUserWithEmailAndPassword(mail, mot_de_passe)
    .then((user) => {
      // Signed in 
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
    
    return this.firestore.doc(`users/${id}`).set({
      nom,
      prenom,
      login,
      adresse,
      date_de_naissance
    });
  }

  public signIn(email: string, password: string) {
    this.firebase.signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('You are Successfully logged in!');
    })
    .catch(err => {
      console.log('Something is wrong:',err.message);
    });
  }
}
