import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  public userLoginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firestoreService: FirestoreService,
    public loadingCtrl: LoadingController,
    private router: Router
    ) { }

  ngOnInit() {
    this.userLoginForm = this.formBuilder.group({
      email: ['', 
      Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ])],
      password: ['', Validators.required]
    });
  }

  async userLogin() {

    const loading = await this.loadingCtrl.create();

    const mail = this.userLoginForm.value.email;
    const password = this.userLoginForm.value.password;

    this.firestoreService.signIn(mail, password)
    .then(
      (res) => {
        console.log(res);
        
        loading.dismiss().then(() => {
          this.router.navigateByUrl('users-list');
        });
      },
    )
    .catch(
      error => {
        
        loading.dismiss().then(() => {
          console.error(error);
        });
      }
    );

    return await loading.present();
  }
}
