import { Component, OnInit } from '@angular/core';

import { Task } from '../model/task.model';
import { TaskService} from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks : Task[];

  constructor(private taskService : TaskService) { }

  ngOnInit() : void {
    this.getTasks();
  }

  getTasks() : void {
    this.taskService.getTasks().then(result => this.tasks = result);
  }

}
