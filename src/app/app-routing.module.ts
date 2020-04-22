import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminConfigComponent } from './admin/admin-config/admin-config.component';
import { ReportAnalysisComponent } from './reports/report-analysis/report-analysis.component';
import { IssueCreateComponent } from './issues/issue-create/issue-create.component';
import { IssueDetailComponent } from './issues/issue-detail/issue-detail.component';


const routes: Routes = [
  { path: '', component:DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin/admin-config', component: AdminConfigComponent},
  { path: 'reports/report-analysis', component: ReportAnalysisComponent},
  { path: 'issues/issue-detail', component: IssueDetailComponent},
  { path: 'issues/issue-create', component: IssueCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
