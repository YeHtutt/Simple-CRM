import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  user: User = new User(); //user object is allocated ( var=user, type= User, User() empty-user-JSON)

  constructor(public dialog: MatDialog) {

  }

  openDialog(): void { 
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }
}