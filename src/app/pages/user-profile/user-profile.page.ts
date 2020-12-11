import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  private id: any;
  public user: User;

  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private firebase: AngularFireAuth
  ) { }

  ngOnInit() {

    if (this.router.getCurrentNavigation().extras.state) {
      
      this.id = this.router.getCurrentNavigation().extras.state.id;

      this.firestoreService.getUserById(this.id).subscribe(user => {
        this.user = user;
      });
    }
  }

}
