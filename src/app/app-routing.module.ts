import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudComponent } from './components/crud/crud.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path:'',redirectTo:'/home',
    pathMatch:'full'
  },
  { path: 'crud', component: CrudComponent },
/*   { path: 'login', component: LoginComponent },
 */  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
  { path: '**', pathMatch: 'full', redirectTo: 'crud' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
