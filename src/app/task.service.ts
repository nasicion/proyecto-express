import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Task } from './model/task.model';

@Injectable()
export class TaskService {

  constructor(private http : HttpClient) { }


  /**
   * Retrieve all tasks for the user
   */
  getTasks() : Promise<Task[]> {
    return this.http.get('api/tareas/').toPromise()
      .then(response => {
        return response as Task[];
      })
      .catch(this.handleError);
  }

  /**
   * Mark the task as completed
   * @param id 
   * @param completada 
   */
  markAsCompleted(id : string, completada : boolean) : void {
    this.http.post(
      'api/tareas/' + id + '/completado',
      {"completada" : completada},
      {responseType : "text"}
    ).toPromise().catch(this.handleError);
  }

  /**
   * Create the a new task
   * @param title - title of the task
   */
  createTask(title : string) : Promise<any> {
    return this.http.post(
        'api/tareas/crear',
        {"titulo" : title},
        {responseType : 'text'}
      ).toPromise().catch(this.handleError);
  }

  /**
   * Delete the task with the provided id
   * @param id - task id
   */
  delete(id : number) {
    this.http.delete('api/tareas/' + id + '/borrar', {responseType : 'text'})
      .toPromise()
      .catch(this.handleError);
  }


  /**
   * Retrieve the pending tasks for the user
   */
  getPendings() {
    return this.http.get('api/tareas/pendientes/').toPromise()
    .then(response => { 
      return response as Task[] 
    })
    .catch(this.handleError);
  }

  /**
   * Retrievbe the completed tasks
   */
  getCompleted() {
    return this.http.get('api/tareas/completas/').toPromise()
    .then(response => { 
      return response as Task[] 
    })
    .catch(this.handleError);
  }


  /**
   * Handles errors
   * @param error 
   */
  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}
