import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserTestListView } from './view/user/userTestListView/userTestListView';
import {RouterOutlet} from "@angular/router";
import { HeaderComponent } from './view/nav/header/header.component';
import { FooterComponent } from './view/nav/footer/footer.component';
import { PathComponent } from './view/nav/path/path.component';
import { UserTakeTestView } from './view/user/userTakeTestView/userTakeTestView';
import { LogInView } from './view/commonView/logInView/logInView';
import { HttpClientModule } from '@angular/common/http';
import { InitAccountView } from './view/commonView/initAccountView/initAccountView';
import { UserDashBoardView } from './view/user/userDashBoardView/userDashBoardView';
import { MyAccountView } from './view/commonView/myAccountView/myAccountView';
import { JumpPage } from './view/jumpPage/jumpPage';
import { ResetPasswordView } from './view/commonView/resetPasswordView/resetPasswordView';
import { AdminDeshBoardView } from './view/admin/adminDeshBoardView/adminDeshBoardView';
import { AdminManageTopicView } from './view/admin/adminManageTopicView/adminManageTopicView';
import {FormsModule} from "@angular/forms";
import { AdminManageTestListView } from './view/admin/adminManageTestListView/adminManageTestListView';
import { AdminManageTestView } from './view/admin/adminManageTestView/adminManageTestView';
import { AdminManageQuestionListView } from './view/admin/adminManageQuestionListView/adminManageQuestionListView';
import { AdminManageAccountListView } from './view/admin/adminManageAccountListView/adminManageAccountListView';
import { UserTestResultView } from './view/user/userTestResultView/userTestResultView ';
import { AdminManageQuestionView } from './view/admin/adminManageQuestionView/adminManageQuestionView';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserTestListView,
    HeaderComponent,
    FooterComponent,
    PathComponent,
    UserTakeTestView,
    LogInView,
    InitAccountView,
    UserDashBoardView,
    MyAccountView,
    JumpPage,
    ResetPasswordView,
    AdminDeshBoardView,
    AdminManageTopicView,
    AdminManageTestListView,
    AdminManageTestView,
    AdminManageQuestionListView,
    AdminManageQuestionView,
    AdminManageAccountListView,
    UserTestResultView,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterOutlet,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
