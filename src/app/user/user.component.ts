import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent  implements OnInit{

  user: User = new User(); //user object is allocated ( var=user, type= User, User() empty-user-JSON)
  
  /*the Array below is a bucket to collect all datas about users*/
  allUsers = []; //empty Array for all Users JSONs or Strings

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private appComponent: AppComponent) { }

  /**This function response all the users when HTML is first time loaded */
  ngOnInit(): void {
    this.firestore
    .collection('users')
    .valueChanges({idField: 'customIdName'})
    .subscribe((changes: any) => {
      console.log('Received changes from DB', changes)
      this.allUsers = changes; //after changes the allUsers array get updated
    });
    this.appComponent.isLoginPage = true; //wenn eingeloggt ist, loginPage ist true -> wird Login Seite versteckt
  }

  openDialog(): void { 
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }
}
