import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  public createUserForm: FormGroup;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.createUserForm = formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      passwordValidation: ['', Validators.required],
      mail: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      adress: ['', Validators.required],
      birthday: ['', Validators.required]
    });
  }

  async createUser() {

    if (this.createUserForm.value.password == this.createUserForm.value.passwordValidation) {
      
      const loading = await this.loadingCtrl.create();
    
      const params = {
        name: this.createUserForm.value.name,
        lastname: this.createUserForm.value.lastname,
        login: this.createUserForm.value.login,
        password: this.createUserForm.value.password,
        passwordValidation: this.createUserForm.value.passwordValidation,
        mail: this.createUserForm.value.mail,
        adress: this.createUserForm.value.adress,
        birthday: this.createUserForm.value.birthday,
      }
    
      this.firestoreService
        .createUser(params)
        .then(
          () => {
            loading.dismiss().then(() => {
              this.router.navigateByUrl('');
            });
          },
          error => {
            loading.dismiss().then(() => {
              console.error(error);
            });
          }
        );
    
      return await loading.present();
    }
  }

  ngOnInit() {
  }

}
