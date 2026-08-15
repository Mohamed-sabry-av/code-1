import { Component, signal } from '@angular/core';
import { passwordsMatchValidator } from '../../validators/passwords-match.validator';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  errorMessage = signal('')

  constructor(private authService:AuthService, private router:Router){}

  signupForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordsMatchValidator },
  );

  onSubmit():void {
    if(this.signupForm.invalid){
      this.signupForm.markAllAsTouched()
      return;
    }

    const {email,password}= this.signupForm.value;

    this.authService.signup({email:email!,password:password!}).subscribe({
      next:()=> {
        this.router.navigate(['/login'])
      },
      error:(err)=>{
        console.log(err)
        this.errorMessage.set(
          err.error?.message ?? "Signup Failed"
        )
      }
    })
  }
}
