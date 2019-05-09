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
import {SuggestionComponent} from './suggestion/suggestion.component';
import {LogoutComponent} from './logout/logout.component';
import {SuggestionViewComponent} from './suggestion-view/suggestion-view.component';
import {SentComponent} from './sent/sent.component';
import {TrashComponent} from './trash/trash.component';
const routes: Routes = [
  {path : 'login' , component: LoginComponent},
  {path : 'register' , component: SignUpComponent},
  {path : 'mail', component: MailComponent},
  {path : 'compose', component: ComposeComponent},
  {path : 'submit-topic/:project_id', component: TopicSubComponent},
  {path : 'submit-topic', component: TopicSubComponent},
  {path : 'topic-view',component: TopicViewComponent },
  {path : 'student-dashboard', component:StudDashComponent},
  {path : 'student-profile', component: StudProfComponent},
  {path : 'student-edit-profile', component: StudEditComponent},
  {path : 'users', component: ActivateComponent},
  {path : 'guide-project-update', component: GuideProjUpdateComponent},
  {path : 'suggestion', component: SuggestionComponent},
  {path : 'suggestion/:project_id/:student_id', component: SuggestionComponent},
  {path : 'logout', component : LogoutComponent},
  {path : 'suggestion-view', component : SuggestionViewComponent},
  {path : 'sent', component : SentComponent },
  {path : 'trash', component : TrashComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
