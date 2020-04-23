import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.scss']
})
export class UserSigninComponent implements OnInit {  
  @Output() signInClosed = new EventEmitter();
  hide:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  onSignInClosed(){    
    this.signInClosed.emit();
  }

  onSignInSubmited(form:NgForm){
    console.log(form);
  }

}
