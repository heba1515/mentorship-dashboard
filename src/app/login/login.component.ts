import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const role = 'Admin'; 

      this.authService.login(email, password, role).subscribe(
        (response) => {
          if (response) {
            localStorage.setItem('role', role);
            this.router.navigate(['/dashboard']);
          } else {
            alert('Invalid email or password');
          }
        },
        (error) => {
          console.error('Login error:', error);
          alert('An error occurred during login. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
