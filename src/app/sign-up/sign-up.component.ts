import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null =>{
    const password  = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password && confirmPassword && password !== confirmPassword){
      return{
        passwordsDontMatch: true
      }
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

  signupForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
    confirmPassword: new FormControl('',Validators.required)
  },{validators: passwordsMatchValidator()})

  constructor(private as: AuthenticationService, private router: Router , private toast: HotToastService){}

  get name(){
    return this.signupForm.get('name');
  }


  get email(){
    return this.signupForm.get('email');
  }

  get password(){
    return this.signupForm.get('password')
  }

  get confirmPassword(){
    return this.signupForm.get('confirmPassword')
  }

  submit(){
    if(!this.signupForm.valid){
      return;
    }

    const{name,email, password} = this.signupForm.value; //destructuring the form

    this.as.signup(name!,email!,password!).pipe(
      this.toast.observe({
        success: 'Congrats ! You have signed up successfully.',
        loading: 'Signing in',
        error: ({message}) => `${message}`
      })
    ).subscribe(()=>{
      this.router.navigate(['/home'])
    })
  }

}
