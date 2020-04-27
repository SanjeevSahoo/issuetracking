import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss'],
})
export class UserSignupComponent implements OnInit {
  hide: boolean = true;
  securityQuestions: Array<String> = [
    'What is your Pet Name ?',
    'What is name of your High School ?',
    'What is your first Smartphone Brand ?',
    'What is your Favourite Color ?',
    'What is your Favourite Sports ?',
  ];

  signupForm: FormGroup;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  errorMessage = null;
  successMessage = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        username: new FormControl(null, [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(5),
        ]),
        emailid: new FormControl(null, [
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
          Validators.minLength(5),
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl(null, Validators.required),
        selectSecurityQuestion: new FormControl(null, Validators.required),
        securityAnswer: new FormControl(null, [
          Validators.required,
          Validators.maxLength(50),
        ]),
      },
      { validators: this.validateConfirmPassword }
    );
  }

  onSignUpSubmit() {
    if (!this.signupForm.valid) {
      return;
    }

    const newUser: User = {
      id:'',
      username: this.signupForm.get('username').value,
      emailid: this.signupForm.get('emailid').value,
      password: this.signupForm.get('password').value,
      securityQuestion: this.signupForm.get('selectSecurityQuestion').value,
      securityAnswer: this.signupForm.get('securityAnswer').value,
      roles: ['User'],
      status: 'Active',
      token: ''
    };

    this.userService.createUser(newUser).subscribe(
      (resultData) => {
        this.errorMessage = null;
        this.successMessage = 'User Created Successfully';
        this.formGroupDirective.resetForm();
        setTimeout(() => {
          this.errorMessage = null;
          this.successMessage = null;
        }, 3000);
      },
      (error) => {
        if (error.status == 422) {
          this.errorMessage = error.error.data[0].msg;
        } else {
          this.errorMessage = error.message;
        }
        setTimeout(() => {
          this.errorMessage = null;
          this.successMessage = null;
        }, 3000);
      }
    );
  }

  validateConfirmPassword(group: FormGroup) {
    let password = group.get('password').value;
    let confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : { noMatch: true };
  }
}
