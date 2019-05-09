import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import * as bootstrap from "bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MailComponent } from './mail/mail.component';
import { ComposeComponent } from './compose/compose.component';
import { TopicSubComponent } from './topic-sub/topic-sub.component';
import { TopicViewComponent } from './topic-view/topic-view.component';
import { StudDashComponent } from './stud-dash/stud-dash.component';
import { StudProfComponent } from './stud-prof/stud-prof.component';
import { StudEditComponent } from './stud-edit/stud-edit.component';
import { ActivateComponent } from './activate/activate.component';
import { GuideProjUpdateComponent } from './guide-proj-update/guide-proj-update.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { LogoutComponent } from './logout/logout.component';
import { SuggestionViewComponent } from './suggestion-view/suggestion-view.component';
import { AdminComponent } from './admin/admin.component';
import { SentComponent } from './sent/sent.component';
import { TrashComponent } from './trash/trash.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    MailComponent,
    ComposeComponent,
    TopicSubComponent,
    TopicViewComponent,
    StudDashComponent,
    StudProfComponent,
    StudEditComponent,
    ActivateComponent,
    GuideProjUpdateComponent,
    SuggestionComponent,
    LogoutComponent,
    SuggestionViewComponent,
    AdminComponent,
    SentComponent,
    TrashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
