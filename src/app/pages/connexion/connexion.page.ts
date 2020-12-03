import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  public userLoginForm: FormGroup;

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
  }

  async createSong() {
    const loading = await this.loadingCtrl.create();
  
    const username = this.userLoginForm.value.username;
    const password = this.userLoginForm.value.password;
  
    return await loading.present();
  }
}
