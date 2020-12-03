import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public userList: Observable<User[]>;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    
    this.userList = this.firestoreService.getUserList();
    
    this.userList.forEach(user => {
      console.log(user);
    });
  }
}
