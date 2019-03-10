import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import{MailComponent} from './mail/mail.component';
import{ComposeComponent} from './compose/compose.component';
import{TopicSubComponent} from './topic-sub/topic-sub.component';
const routes: Routes = [
  {path:'login' , component: LoginComponent},
  {path:'sign-up' , component: SignUpComponent},
  {path:'mail', component: MailComponent},
  {path : 'compose', component: ComposeComponent},
  {path : 'topic-sub', component: TopicSubComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
