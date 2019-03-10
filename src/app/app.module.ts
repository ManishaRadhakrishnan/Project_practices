import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MailComponent } from './mail/mail.component';
import { ComposeComponent } from './compose/compose.component';
import { TopicSubComponent } from './topic-sub/topic-sub.component';
import { TopicViewComponent } from './topic-view/topic-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    MailComponent,
    ComposeComponent,
    TopicSubComponent,
    TopicViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
