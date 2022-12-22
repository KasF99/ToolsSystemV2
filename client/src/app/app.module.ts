import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DatePickerComponent } from './_forms/date-picker/date-picker.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToolsRegisterAdminComponent } from './admin-panel/tools/tools-register-admin/tools-register-admin.component';
import { OwnerChooseComponent } from './_forms/owner-choose/owner-choose.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsDeletionComponent } from './_forms/modals-deletion/modals-deletion.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ToolsServiceAdminComponent } from './admin-panel/tools/tools-service-admin/tools-service-admin.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { SetPropComponent } from './_forms/set-prop/set-prop.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { SetPropTableComponent } from './_forms/set-prop-table/set-prop-table.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PdfCompAdminComponent } from './admin-panel/tools/pdf-comp-admin/pdf-comp-admin.component';
import { CustomValueComponent } from './_forms/custom-value/custom-value.component';




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
    TextInputComponent,
    DatePickerComponent,
    ToolsRegisterAdminComponent,
    OwnerChooseComponent,
    ModalsDeletionComponent,
    ToolsServiceAdminComponent,
    SetPropComponent,
    SetPropTableComponent,
    PdfCompAdminComponent,
    CustomValueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    TabsModule.forRoot(),
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatGridListModule,
    MatTableModule,
    MatSlideToggleModule, 
    MatCheckboxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
