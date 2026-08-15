import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { Signup } from '../signup/signup';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, Signup],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  errorMessage = signal('');

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    

    this.authService.login({ email: email!, password: password! }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => this.errorMessage.set(err.error?.message ?? 'login Failed'),
    });
  }
}
