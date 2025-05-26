import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
 
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null;
  isSubmitting: boolean = false;
  showPassword: boolean = false; // Track password visibility

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  async onLogin(): Promise<void> {
    if (this.isSubmitting || this.loginForm.invalid) {
      this.loginError = this.loginForm.invalid
        ? 'Please fill in all required fields correctly'
        : null;
      return;
    }

    this.isSubmitting = true;
    const { email, password } = this.loginForm.value;
    console.log('Login attempt:', email, password);

    try {
      const result = await this.authService.login(email, password);
      console.log('Login result:', result);

      if (result.success) {
        this.loginError = null;
        this.loginForm.reset();
        const modal = document.getElementById('login');
        if (modal) {
          const bootstrapModal = (window as any).bootstrap.Modal.getInstance(
            modal
          );
          bootstrapModal?.hide();
        }
        this.router.navigate(['/clients']);
      } else {
        this.loginError = result.message;
      }
    } catch (error) {
      this.loginError = 'An unexpected error occurred';
      console.error('Login error:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
