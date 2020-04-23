import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatSelectModule} from '@angular/material/select';

import { DashboardComponent } from './dashboard/dashboard.component';
import { IssueDetailComponent } from './issues/issue-detail/issue-detail.component';
import { IssueCreateComponent } from './issues/issue-create/issue-create.component';
import { ReportAnalysisComponent } from './reports/report-analysis/report-analysis.component';
import { AdminConfigComponent } from './admin/admin-config/admin-config.component';
import { UserSignupComponent } from './users/user-signup/user-signup.component';
import { UserSigninComponent } from './users/user-signin/user-signin.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IssueDetailComponent,
    IssueCreateComponent,
    ReportAnalysisComponent,
    AdminConfigComponent,
    UserSignupComponent,
    UserSigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    FormsModule,     
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
