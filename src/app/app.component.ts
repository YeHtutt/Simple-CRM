import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthenticationService } from './services/authentication.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'simple-crm';

  isLoginPage: boolean = false; //Am Anfang bevor eingeloggt

  constructor(public authService: AuthenticationService, private router: Router, private afAuth: AngularFireAuth) {}



  ngOnInit(): void {
    if(this.authService.isLoggedIn$){
      this.isLoginPage = false; //wenn nicht eingeloggt ist, loginPage ist false -> wird sidenav und sidenav-content versteckt
    }else {
      this.isLoginPage = true; //wenn eingeloggt ist, loginPage ist true -> wird Login Seite versteckt
    }
    
  }

  logout() { //Funktion Logout() von Firebase authService wird aufgerufen und navigiert den Router zu landing page
    this.authService.logout().subscribe(() => {
      this.router.navigate(['login'])
      this.isLoginPage = false;
    } ); 
  }
  
}
