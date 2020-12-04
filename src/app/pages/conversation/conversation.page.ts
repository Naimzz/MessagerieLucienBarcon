import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  private users_ids: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    if (this.router.getCurrentNavigation().extras.state) {
      
      this.users_ids = this.router.getCurrentNavigation().extras.state;
    }
  }
}
