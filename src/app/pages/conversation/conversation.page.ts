import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message.interface';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  private users_ids: any;
  public messageList: Observable<Message[]>;

  constructor(
    private router: Router,
    private firestoreService: FirestoreService 
  ) { }

  ngOnInit() {

    if (this.router.getCurrentNavigation().extras.state) {
      
      this.users_ids = this.router.getCurrentNavigation().extras.state;
      console.log(this.users_ids.him);
    }
    this.messageList = this.firestoreService.getMessagesList();
  }
}
