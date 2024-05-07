import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';

import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{component:SignupComponent,path:"signup"},
{component:LoginComponent,path:"login"},
{component:HomepageComponent,path:"homepage"}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
