import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/AuthService/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  loginForm : FormGroup;

  constructor(private fb : FormBuilder, private authService : Auth, private router : Router) {
    this.loginForm = this.fb.group({
      email : ["", [Validators.required, Validators.email]],
      password : ["",[Validators.required, Validators.minLength(6)]]
    });
  }



   onSubmit(): void {
    if (this.loginForm.invalid) {
      return ;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next : () => {
        this.router.navigate(["/dashboard"])
      },
      error : (err) => {
        console.log("Login error ", err)
      }
    })
  }

}
