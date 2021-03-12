import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailComponent } from './components/user/detail/detail.component';
import { EditComponent } from './components/user/edit/edit.component';
import { ListComponent } from './components/user/list/list.component';
import { RegisterComponent } from './components/user/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'datail/:id', component: DetailComponent },
  { path: 'list', component: ListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
