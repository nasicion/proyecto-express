import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

//Ng Materials
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatCheckboxModule, MatInputModule, MatButtonModule } from '@angular/material'

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { TaskService } from './task.service';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const appRoutes : Routes = [
  { path: '', pathMatch : 'prefix' ,redirectTo : 'tasks/'},
  { path : 'tasks', component : TaskComponent },
  { path : 'tasks/:view', component : TaskComponent },
  { path : 'login', component : LoginComponent },
  { path: 'register', component : RegisterComponent },
  { path : '401', redirectTo : 'login' }
];

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [TaskService, UserService],
  // bootstrap: [TaskComponent]
  bootstrap: [AppComponent]
})
export class AppModule { }

