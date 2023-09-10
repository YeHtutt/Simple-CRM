import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  
 constructor(private appComponent: AppComponent){
  
 }

 ngOnInit(): void {
  this.appComponent.isLoginPage = true; //wenn eingeloggt ist, loginPage ist true -> wird Login Seite versteckt
 }

 
}
