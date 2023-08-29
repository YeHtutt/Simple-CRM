import { Component } from '@angular/core';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {

  user = new User(); //allocated user
  birthDate: Date; //variable birthDate with time-stamp
  
  onNoClick() { }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime(); //get Time stamp from the Date zB. 002332423400
    console.log('Current user is: ', this.user);
  }
}
