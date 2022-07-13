import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {MainComponent} from "./components/main/main.component";
import {ResourcesComponent} from "./components/resources/resources.component";
import {InfoUserComponent} from "./components/info-user/info-user.component";
import {UsersComponent} from "./components/users/users.component";

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {path: 'resources', component: ResourcesComponent},
      {path: 'users', component: UsersComponent},
      {path: 'info/:id', component: InfoUserComponent},
      {path: '', redirectTo: 'users', pathMatch: "prefix"}
    ], canActivate: [AuthGuard]
  },
  {path: 'auth', component: LoginComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
