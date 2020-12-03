import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

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
  
    return this.firestore.doc(`users/${id}`).set({
      id,
      adresse,
      date_de_naissance,
      login,
      mail,
      mot_de_passe,
      nom,
      prenom
    });
  }
}
