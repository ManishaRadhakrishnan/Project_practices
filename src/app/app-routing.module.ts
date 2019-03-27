import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import{MailComponent} from './mail/mail.component';
import{ComposeComponent} from './compose/compose.component';
import{TopicSubComponent} from './topic-sub/topic-sub.component';
import {TopicViewComponent} from './topic-view/topic-view.component';
import {StudDashComponent} from './stud-dash/stud-dash.component';
import {StudProfComponent} from './stud-prof/stud-prof.component';
import {StudEditComponent} from './stud-edit/stud-edit.component';
import {ActivateComponent} from './activate/activate.component';
import {GuideProjUpdateComponent} from './guide-proj-update/guide-proj-update.component';
const routes: Routes = [
  {path:'login' , component: LoginComponent},
  {path:'sign-up' , component: SignUpComponent},
  {path:'mail', component: MailComponent},
  {path : 'compose', component: ComposeComponent},
  {path : 'topic-sub', component: TopicSubComponent},
  {path: 'topic-view',component: TopicViewComponent },
  {path: 'stud-dash', component:StudDashComponent},
  {path: 'stud-prof', component: StudProfComponent},
  {path: 'stud-edit', component: StudEditComponent},
  {path: 'activate', component: ActivateComponent},
  {path: 'guide-proj-update', component: GuideProjUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
