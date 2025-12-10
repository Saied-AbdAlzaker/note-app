import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  isLoading: boolean = false;
  errMessage: string = '';
  private auth = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  signinForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
      ),
    ]),
  });

  submitForm() {
    this.errMessage = '';
    this.isLoading = true;
    this.auth.signin(this.signinForm.value).subscribe({
      next: (res) => {
        if (res.msg == 'done') {
          this.toastr.success('Success', res.msg);
          localStorage.setItem('token', `3b8ny__${res.token}`);
          this.auth.userInfo();
          this.router.navigate(['/home']);
        }
        this.isLoading = false;
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
