import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'issuetracking';
  isSignInEnabled:boolean = false;

  appMenus: Array<Object> = [
    { name: "Admin", route:"/admin/admin-config"},
    { name: "Analysis", route:"/reports/report-analysis"},
    { name: "View Issues",route:"/issues/issue-detail"},
    { name: "Create Issue", route:"/issues/issue-create"}
  ];

  toggleSignIn(){
    this.isSignInEnabled = !this.isSignInEnabled;    
  }
}
