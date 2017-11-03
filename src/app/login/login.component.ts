import { Component, OnInit } from '@angular/core';

@Component({
  //selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  keyEvent = function(event) : void {
    if(event.keyCode == '13') {
      (document.getElementById(event.target.form.id) as HTMLFormElement).submit();
    }
  }
}
