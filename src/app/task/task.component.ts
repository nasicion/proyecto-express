import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from '../app.component'
import { Task } from '../model/task.model';
import { TaskService} from '../task.service';

@Component({
  // selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks : Task[];
  title : string;
  pendings: Task[];
  completed: Task[];
  selectedView : string;
  view : object;
  

  constructor(
    private taskService : TaskService,
    private router : Router,
    private route : ActivatedRoute,
    private appComponent : AppComponent) { }

  ngOnInit() : void {
    
    this.route.params.subscribe(params => {
      
      this.view = {
        todas: true,
        pendientes: false,
        completas: false
      };
      
      this.selectedView = params['view'];
      if(this.selectedView != undefined && this.selectedView != '') {
        this.view[this.selectedView] = true;
        this.view['todas'] = false;
      }

      this.getTasks();
    });



    
  }

  getTasks() : void {
    var pendings = this.getPendings();
    var completed = this.getCompleted();

    Promise.all([pendings, completed])
      .then((data) => {
        if(this.view['completas']) {
          this.tasks = this.completed;
        } else if (this.view['pendientes']) {
          this.tasks = this.pendings;
        } else {
          this.tasks = this.pendings.concat(this.completed);
        }
      }).catch(error => {this.appComponent.handleHttpError(error)});
  }

  getPendings() : Promise<Task[]> {
    return this.taskService.getPendings().then(result => this.pendings = result);
  }

  getCompleted() : Promise<Task[]> {
    return this.taskService.getCompleted().then(result => this.completed = result);
  }

  markCompleted(id : any, event : any) : void {
    this.taskService.markAsCompleted(id, event.checked);
  }

  createTask() : void {
    this.taskService.createTask(this.title)
    .then( response => {
      this.title = '';
      this.getTasks();
    }).catch(error => this.appComponent.handleHttpError(error));
    
  }

  formSubmit(event : any) {
    if(event.keyCode == 13) {
      if(this.title != undefined && this.title != null && this.title != '') {
        this.createTask();
      }
    }
  }

  delete(id : number) {
    this.taskService.delete(id);
    this.getTasks();
  }
}
