import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Task } from './model/task.model';

@Injectable()
export class TaskService {

  constructor(private http : Http) { }


  getTasks() : Promise<Task[]> {
    return this.http.get('api/tareas/').toPromise()
      .then(response => {return response.json() as Task[]})
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
