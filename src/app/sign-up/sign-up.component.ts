import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppComponent } from '../app.component';


export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true
      };
    }
    return null;
  };
}


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, {validators: passwordsMatchValidator()}) //Cross Field Validators


  constructor(private authService: AuthenticationService, private router: Router, private appComponent: AppComponent) {
    this.appComponent.isLoginPage = false; //wenn nicht eingeloggt ist, loginPage ist false -> wird sidenav und sidenav-content versteckt
  }

  /**validation of required */
  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }


  submit() {
    if(!this.signUpForm.valid) {
      return;
    }

    const {name, email, password } = this.signUpForm.value; 
    this.authService.signUp(name, email, password).subscribe( () => {
      this.router.navigate(['/dashboard']);
      this.appComponent.isLoginPage = true; //wenn eingeloggt ist, loginPage ist true -> wird Login Seite versteckt
    })
  }

}
