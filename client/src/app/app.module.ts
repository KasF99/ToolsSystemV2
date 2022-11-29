import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component'
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ToolsDetailComponent } from './tools/tools-detail/tools-detail.component';
import { ToolsListComponent } from './tools/tools-list/tools-list.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MechanicPanelComponent } from './mechanic-panel/mechanic-panel.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToolsCardComponent } from './tools/tools-card/tools-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ToolsCardAdminComponent } from './admin-panel/tools/tools-card-admin/tools-card-admin.component';
import { ToolsDetailAdminComponent } from './admin-panel/tools/tools-detail-admin/tools-detail-admin.component';
import { ToolsListAdminComponent } from './admin-panel/tools/tools-list-admin/tools-list-admin.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { ToolsEditAdminComponent } from './admin-panel/tools/tools-edit-admin/tools-edit-admin.component';

 import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { PhotoEditotAdminComponent } from './admin-panel/photo-edit-admin/photo-edit-admin.component';
// import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ToolsDetailComponent,
    ToolsListComponent,
    AdminPanelComponent,
    MechanicPanelComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ToolsCardComponent,
    ToolsCardAdminComponent,
    ToolsDetailAdminComponent,
    ToolsListAdminComponent,
    MemberEditComponent,
    ToolsEditAdminComponent,
    PhotoEditotAdminComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    TabsModule.forRoot(),
    // NgxSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
