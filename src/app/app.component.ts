import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
 selector: 'my-app',
 template: '<router-outlet></router-outlet>'
})
export class AppComponent { 
    
    constructor (private router : Router) {}

    /**
     * Handles the httpError
     * @param error : HttpErrorResponse
     */
    handleHttpError(error : HttpErrorResponse) : void {
        this.router.navigate(["/"+error.status]);
    }
}