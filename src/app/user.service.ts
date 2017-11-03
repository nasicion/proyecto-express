import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';


const usersApiUrl = 'api/usuarios/';

@Injectable()
export class UserService {

  constructor(private http : HttpClient) { }

  register = function(userData) : Promise<any> {
    return this.http.post(usersApiUrl + 'register', userData)
    .toPromise()
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
