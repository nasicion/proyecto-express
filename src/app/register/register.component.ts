import { Component, OnInit, Input } from '@angular/core';

import { UserService } from '../user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name : string;
  lastname : string;
  email : string;
  emailConfirmation : string;
  validEmails : boolean;
  

  requesting : boolean;
  showMessage : boolean;
  message : string;
  hasErrored : boolean;

  constructor(private userService : UserService) { 
    this.requesting = false;
  }

  ngOnInit() {
    this.showMessage = false;
  }


  validateEmail = function() {
    this.validEmails = 
      this.email != undefined && 
      this.emailConfirmation != undefined && 
      this.email == this.emailConfirmation;
  } 

  register = function() {
    this.requesting = true;

    this.userService.register(
      {
        "name" : this.name,
        "lastname" : this.lastname,
        "email" : this.email
      }
    )
    .then(response => {
      this.requesting = false;
      this.showMessage = true;
      this.message = response.message;
      this.hasErrored = !response.success;
    })
    .catch(error => {
      this.showMessage = true;
      this.message = "error";
      this.hasErrored = true;
      this.requesting = false;
    });


  }
}
