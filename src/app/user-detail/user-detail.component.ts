import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  
  userId='';
  user: User = new User(); //object orientated initializing a variable with type and allocation of Class instance User()

  /**Injecting ActivatedRoute in UserDetailComponent to extract the route parameters  */
  constructor(private route:ActivatedRoute, private firestore: AngularFirestore, 
    public dialog: MatDialog) {
  }

  ngOnInit() {
    /**get the User-ID(route parameter) from the URL -asynchrone response of user id */
    this.route.paramMap.subscribe( paramMap => {
      this.userId = paramMap.get('id');

      //console.log('User Id: ', this.userId);
      this.getUser();
  })
  }


  getUser() {
    this.firestore
    .collection('users')
    .doc(this.userId)
    .valueChanges()
    .subscribe((user: any) => { //subscribe from firebase user String datas
      this.user = new User(user);  //handed over to the new user variable with the data base User informations
      
      console.log('Retrive User:', this.user);
    });
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent); //initialize the object content to the variable call dialog
    //dialog.componentInstance.user = this.user; //the new instanz of user get the datas from the firebase user
    dialog.componentInstance.user = new User( this.user.toJSON()); //make a copy of the instanz 
    dialog.componentInstance.userId = this.userId; //handed over to the DialogEditUserComponent-userId the userId
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent); //initialize the object content to the variable call dialog
    //dialog.componentInstance.user = this.user;  //the new instanz of user get the datas from the firebase user
    dialog.componentInstance.user = new User( this.user.toJSON()); //make a copy of the instanz 
    dialog.componentInstance.userId = this.userId; //handed over to the DialogEditAddressComponent-userId the userId
  }


}
