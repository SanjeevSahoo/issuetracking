import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {

  constructor(private userSerive:UserService) { 
    this.userSerive.getAllUsers().subscribe(result=>{
      console.log(result);
    },error=>{
      console.log(error);
    });
  }

  ngOnInit(): void {
  }

}
