import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private appComponent: AppComponent
  ) {
    this.appComponent.isLoginPage = false; //wenn nicht eingeloggt ist, loginPage ist false -> wird sidenav und sidenav-content versteckt
  }

  
  ngOninit() {
    
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() { //beim submitten des Forms wird email und password Valide Eingabe geprüft
    if (!this.loginForm.valid) { //Wenn nicht Valide Eingaben des Login ist, dann passiert nicht
      return; //nicht zurückgeben
    }

    const { email, password } = this.loginForm.value; //wenn valide Eingaben des Login, dann wurden die email und password von Form übernommen und an die Login Funktion übergenen
    this.authService.login(email, password).subscribe(() => { //Wenn email password übergeben sind, wurde der authService aboniert und zur Dashboard Seite navigiert
      this.router.navigate(['/dashboard']); //wenn Einlogen funktioniert wird direkt zur HauptSeite navigiert
      //console.log(email, password)
      this.appComponent.isLoginPage = true; //wenn eingeloggt ist, loginPage ist true -> wird Login Seite versteckt
    });
  }

  
  // Diese Funktion ermöglicht den Gast-Login
  loginAsGuest() {
    // Platz für die Logik für den Gast-Login

    // hier wird eine vorgegebene Gast-E-Mail und ein Passwort verwendet.
    const guestEmail = 'guest@crm.com';
    const guestPassword = 'guest123';

    // Rufe den authService auf, um den Gast einzuloggen
    this.authService.login(guestEmail, guestPassword).subscribe(() => {
      this.router.navigate(['/dashboard']);
      this.appComponent.isLoginPage = true;
    });
  }

}
