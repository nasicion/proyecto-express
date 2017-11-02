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

  markAsCompleted(id : string, completada : boolean) : void {
    this.http.post('api/tareas/' + id + '/completado',
      {"completada" : completada}).toPromise()
      .then(response => { })
      .catch(this.handleError);
  }

  createTask(title : string) : void {
      this.http.post('api/tareas/crear',
        {"titulo" : title}).toPromise()
        .then(response => { console.log(response) })
        .catch(this.handleError);
  }

  delete(id : number) {
    this.http.delete('api/tareas/' + id + '/borrar').toPromise()
      .catch(this.handleError);
  }


  getPendings() {
    return this.http.get('api/tareas/pendientes/').toPromise()
    .then(response => { return response.json() as Task[] })
    .catch(this.handleError);
  }

  getCompleted() {
    return this.http.get('api/tareas/completas/').toPromise()
    .then(response => { return response.json() as Task[] })
    .catch(this.handleError);
  }


  /**
   * Handles errors
   * @param error 
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
