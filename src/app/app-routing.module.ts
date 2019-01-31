import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/public/login', pathMatch: 'full' },
  // { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'public', loadChildren: './public/public-routing.module#PublicRoutingModule' },
  { path: 'private', loadChildren: './private/private-routing.module#PrivateRoutingModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
