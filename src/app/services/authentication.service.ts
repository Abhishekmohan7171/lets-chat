import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Observable, from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth)

  constructor(private auth: Auth) { }

  //signup function
  signup(name: string, email: string, password: string){
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap(({user}) => updateProfile(user, {displayName: name}))
    )
  }


  //login function
  login(email: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, email, password))
  }
  //logout
  logout(){
    return from(this.auth.signOut());
  }
}
