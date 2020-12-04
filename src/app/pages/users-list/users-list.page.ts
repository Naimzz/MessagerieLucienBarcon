import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {
  
  public userList: Observable<User[]>;
  public userId: String;

  constructor(
    private firestoreService: FirestoreService,
    private firebase: AngularFireAuth,
    private router: Router
    ) { }

  ngOnInit() {
    
    this.userList = this.firestoreService.getUserList();
    this.firebase.authState.subscribe(user => {
      this.userId = user.uid;
    })
  }

  public openConversation(auth_id) {

    this.router.navigate(['/conversation'], {
      state: {
        you: this.userId,
        him: auth_id
      }
    });
  }
}
