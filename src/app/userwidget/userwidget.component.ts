import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-userwidget',
  templateUrl: './userwidget.component.html',
  styleUrls: ['./userwidget.component.css']
})
export class UserwidgetComponent implements OnInit {

  user : any;

  constructor(private userService : UserService) { }

  ngOnInit() {
    this.userService.getLoggedUser().then(user => {
    
      this.user = user;
     }).catch(error => { console.log(error) });
  }

}
