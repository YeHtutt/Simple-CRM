import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {

  user = new User(); //allocated user
  birthDate: Date; //variable birthDate with time-stamp
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: AngularFirestore) {}
  
  onNoClick() { 
    this.dialogRef.close();
  }

  /** This function saved the input data to the Angular Firestore*/
  saveUser() {
    this.user.birthDate = this.birthDate.getTime(); //get Time stamp from the Date zB. 002332423400
    console.log('Current user is: ', this.user);
    this.loading =true;

    /** Save User to the firebase and take promise from firestore - with firestore.collection */
    this.firestore
    .collection('users')
    .add(this.user.toJSON())
    .then((result: any) => {

      console.log('Add a user Information: ', result)
      this.loading = false;
      this.dialogRef.close();
    }); 

  }
}
