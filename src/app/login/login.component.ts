import { Component } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  constructor(private as: AuthenticationService, private router:Router,private toast: HotToastService){}


  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password')
  }

  submit(){
    if(!this.loginForm.valid){
      return;
    }

    const{ email, password} = this.loginForm.value; //destructuring the login form

    this.as.login(email! ,password!).pipe(
      this.toast.observe({
        success: "Logged in successfully",
        loading:"Logging in",
        error: "There was an error, Try again Later."
      })
    ).subscribe(() => {
      this.router.navigate(['/home']);
    })
  }

}
