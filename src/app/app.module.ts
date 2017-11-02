import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

//Ng Materials
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatCheckboxModule, MatInputModule } from '@angular/material'

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { TaskService } from './task.service';
import { LoginComponent } from './login/login.component';

const appRoutes : Routes = [
  { path: '', pathMatch : 'prefix' ,redirectTo : 'tasks/'},
  { path : 'tasks/', component : TaskComponent },
  { path : 'tasks/:view', component : TaskComponent },
  { path : 'login', component : LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    BrowserModule,
    FormsModule,
    HttpModule,
    MatCheckboxModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [TaskService],
  // bootstrap: [TaskComponent]
  bootstrap: [AppComponent]
})
export class AppModule { }
