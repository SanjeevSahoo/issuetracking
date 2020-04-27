import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.scss']
})
export class UserSigninComponent implements OnInit {  
  @Output() signInClosed = new EventEmitter();
  hide:boolean = true;
  errorMessage:string = null;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  onSignInClosed(){    
    this.signInClosed.emit();
  }

  onSignInSubmited(form:NgForm){
    if(!form.valid){
      return;
    }
    this.errorMessage = null;
    const emailid = form.value.emailid;
    const password = form.value.password;

    this.userService.login(emailid, password).subscribe(result=>{      
      this.onSignInClosed();
      this.router.navigate(['/dashboard']);
    },
    error=>{      
      if(error.status == 403){
        this.errorMessage = error.error.message;   
      }
      else if(error.status == 422){
        this.errorMessage = error.error.data[0].msg;   
      }  
      else{
        this.errorMessage = error.message;
      }
    });
  }

  

}
