import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'issuetracking';
  isSignInEnabled:boolean = false;
  currenUser:User=null;

  constructor(private router:Router, private userService:UserService){
    this.userService.currentUser.subscribe(user=>{
      this.currenUser = user;
    });
  }

  appMenus: Array<Object> = [
    { name: "Admin", route:"/admin/admin-config", roles: ['Admin']},
    { name: "Analysis", route:"/reports/report-analysis", roles: ['User','Admin','Developer']},
    { name: "View Issues",route:"/issues/issue-detail", roles: ['User','Admin','Developer']},
    { name: "Create Issue", route:"/issues/issue-create", roles: ['User','Admin']}
  ];

  toggleSignIn(){
    this.isSignInEnabled = !this.isSignInEnabled;    
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/home']);
  }
}
