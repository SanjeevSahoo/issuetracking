import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminConfigComponent } from './admin/admin-config/admin-config.component';
import { ReportAnalysisComponent } from './reports/report-analysis/report-analysis.component';
import { IssueCreateComponent } from './issues/issue-create/issue-create.component';
import { IssueDetailComponent } from './issues/issue-detail/issue-detail.component';
import { UserSignupComponent } from './users/user-signup/user-signup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard';


const routes: Routes = [
  { path: '', redirectTo:'home',pathMatch:'full' },
  { path: 'home', component:HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'admin/admin-config', component: AdminConfigComponent, canActivate:[AuthGuard]},
  { path: 'reports/report-analysis', component: ReportAnalysisComponent, canActivate:[AuthGuard]},
  { path: 'issues/issue-detail', component: IssueDetailComponent, canActivate:[AuthGuard]},
  { path: 'issues/issue-create', component: IssueCreateComponent, canActivate:[AuthGuard] },
  { path: 'users/user-signup', component: UserSignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
