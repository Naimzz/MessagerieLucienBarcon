import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  public userLoginForm: FormGroup;
  public userList: Observable<User[]>;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router
    ) { 

      this.userLoginForm = formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  ngOnInit() {

    this.userList = this.firestoreService.getUserList();
  }

  async userLogin() {

    const login = this.userLoginForm.value.username;
    const password = this.userLoginForm.value.password;

    this.userList.forEach(userArray => {
      
      userArray.forEach(user => {

        if (user.login == login && user.mot_de_passe == password) {
          
          console.log("Connexion");
        }
      });
    });    
  }
}
