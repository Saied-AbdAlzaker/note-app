import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  isLoading: boolean = false;
  errMessage: string = '';
  private auth = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  signupForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
      ),
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(18),
      Validators.max(50),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^01[0-2,5]{1}[0-9]{8}$'),
    ]),
  });

  submitForm() {
    this.isLoading = true;
    this.auth.signup(this.signupForm.value).subscribe({
      next: (res) => {
        this.toastr.success('Success', res.msg);
        this.isLoading = false;
        this.router.navigate(['/signin']);
        console.log(res);
      },
      error: (err) => {
        this.errMessage = err.error.msg;
        this.toastr.error('Error!', err.error.msg);
        this.isLoading = false;
        console.log(err);
      },
    });
  }
}
