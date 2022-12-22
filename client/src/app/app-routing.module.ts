import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { PdfCompAdminComponent } from './admin-panel/tools/pdf-comp-admin/pdf-comp-admin.component';
import { ToolsDetailAdminComponent } from './admin-panel/tools/tools-detail-admin/tools-detail-admin.component';
import { ToolsEditAdminComponent } from './admin-panel/tools/tools-edit-admin/tools-edit-admin.component';
import { ToolsListAdminComponent } from './admin-panel/tools/tools-list-admin/tools-list-admin.component';
import { ToolsRegisterAdminComponent } from './admin-panel/tools/tools-register-admin/tools-register-admin.component';
import { ToolsServiceAdminComponent } from './admin-panel/tools/tools-service-admin/tools-service-admin.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { MechanicPanelComponent } from './mechanic-panel/mechanic-panel.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { ToolsDetailComponent } from './tools/tools-detail/tools-detail.component';
import { ToolsListComponent } from './tools/tools-list/tools-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventChangesGuard } from './_guards/prevent-changes.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      
      { path: 'tools', component: ToolsListComponent },
      { path: 'tools/:toolname', component: ToolsDetailComponent },

      { path: 'admin/tools', component: ToolsListAdminComponent },
      { path: 'admin/tools/:toolname', component: ToolsDetailAdminComponent },
      { path: 'admin/tools/:toolname/edit', component: ToolsEditAdminComponent, canDeactivate: [PreventChangesGuard] },
      { path: 'admin/register-tools', component: ToolsRegisterAdminComponent },
      { path: 'admin/service-tools', component: ToolsServiceAdminComponent },
      { path: 'admin/pdf-print/:toolname', component: PdfCompAdminComponent },

      

      { path: 'member/edit', component: MemberEditComponent },
      { path: 'admin', component: AdminPanelComponent },
      { path: 'mechanic', component: MechanicPanelComponent },
    ]
  },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
