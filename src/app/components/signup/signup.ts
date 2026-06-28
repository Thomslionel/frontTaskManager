import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/AuthService/auth';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {

   signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService : Auth,
    private router : Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return ;
    }
    this.authService.register(this.signupForm.value).subscribe({
      next : () => {
        this.router.navigate(["/login"])
      },
      error : (err) => {
        console.log("Signup error ", err)
      }
    })
  }
}
