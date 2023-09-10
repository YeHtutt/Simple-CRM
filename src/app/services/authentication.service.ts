import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { from, map, switchMap } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth : Auth, private afAuth: AngularFireAuth) { }

  //currentUser$ = authState(this.auth); //Observable für authentication Statuts login and logout

  isLoggedIn$: Observable<boolean>; // Ändere dies zu einer Observable-Eigenschaft
  ngOninit() {
    this.isLoggedIn$ = this.afAuth.authState.pipe(
      map(user => !!user) // Konvertiere den Benutzer in ein boolesches Wert
    );
  }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password)); //die promise zurückgeben
  }

  signUp(name: string, email: string, password: string) { /*signUp-Funktion Rückgabe wird mit from() in ein Observable umgewandelt, Typ- Observable<void>*/
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({ user }) =>
        updateProfile(user, { displayName: name })
      ));
  }

  logout() {
    return from(this.auth.signOut()); /*Beim Aufruf logOut-Funktion, ein Observable erhalten, das man abonnieren kann, um das Ergebnis der Anmeldeoperation zu verfolgen*/
  }

  //Authentifizierungsstatus abhängige Methode
  /*get isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user) // Konvertiere den Benutzer in ein boolesches Wert
    );
  }*/
}
