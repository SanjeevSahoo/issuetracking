import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {

  hide:boolean = true;
  securityQuestions:Array<String> = [
    'What is your Pet Name ?',
    'What is name of your High School ?',
    'What is your first Smartphone Brand ?',
    'What is your Favourite Color ?',
    'What is your Favourite Sports ?'
  ];

  signupForm:FormGroup;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor() { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'emailid': new FormControl(null,[Validators.required, Validators.email]),
      'password': new FormControl(null,[Validators.required, Validators.maxLength(16), Validators.minLength(8)]),
      'confirmPassword': new FormControl(null,Validators.required),
      'selectSecurityQuestion': new FormControl(null,Validators.required),
      'securityAnswer': new FormControl(null, Validators.required)
    },{validators: this.validateConfirmPassword});
  }
  
  onSignUpSubmit(){
    console.log(this.signupForm);
    this.formGroupDirective.resetForm();
  }

  validateConfirmPassword(group:FormGroup){
    let password = group.get('password').value;
    let confirmPassword = group.get('confirmPassword').value;

    return password===confirmPassword?null:{noMatch:true};
  }
}
