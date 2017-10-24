import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

// import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { TaskService } from './task.service';

@NgModule({
  declarations: [
    // AppComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TaskService],
  bootstrap: [TaskComponent]
})
export class AppModule { }
