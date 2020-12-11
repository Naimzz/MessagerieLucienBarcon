import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message.interface';
import { User } from 'src/app/models/user.interface';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {
  
  public userList: User[] = [];
  public messageList: Message[] = [];
  public userId: String;

  constructor(
    private firestoreService: FirestoreService,
    private firebase: AngularFireAuth,
    private router: Router
    ) { }

  ngOnInit() {
    
    this.firestoreService.getUserList().subscribe(events => {

      this.userList = events;
    });
    this.firebase.authState.subscribe(user => {
      this.userId = user.uid;
    })
    this.firestoreService.getMessagesList().subscribe(events => {
      this.messageList = events;
      this.findUserMessage();
    });
  }

  public findUserMessage() {

    this.userList.forEach(user => {

      user.last_message = "";
      
      this.messageList.forEach(message => {

        if (message.id_destinataire == user.auth_id || message.id_envoyeur == user.auth_id) {
          
          user.last_message = message.contenu;
        }
      });
    });
  }

  public openConversation(auth_id, name) {

    this.router.navigate(['/conversation'], {
      state: {
        you: this.userId,
        him: auth_id,
        name: name
      }
    });
  }
}
