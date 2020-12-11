import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message.interface';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  private users_ids: any = [];
  public messageList: Message[];
  public message: String = "";

  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {

    if (this.router.getCurrentNavigation().extras.state) {
      
      this.users_ids = this.router.getCurrentNavigation().extras.state;
    } else {

      this.router.navigateByUrl('');
    }
    this.firestoreService.getMessagesList().subscribe(events => {
      this.messageList = events;
      this.messageList.reverse();
    });
  }

  async sendMessage() {

    if (this.message != "") {

      const loading = await this.loadingCtrl.create();

      this.firestoreService
        .sendMessage(this.message, this.users_ids.him, this.users_ids.you)
        .then(
          () => {
            loading.dismiss().then(() => {
              this.message = "";
              this.firestoreService.getMessagesList().subscribe(events => {
                this.messageList = events;
                this.messageList.reverse();
              }); 
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

  public openProfile(auth_id) {

    this.router.navigate(['/user-profile'], {
      state: {
        id: auth_id
      }
    });
  }
}
