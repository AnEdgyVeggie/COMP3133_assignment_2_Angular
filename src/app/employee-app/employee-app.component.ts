import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {API_URL} from "../constants/API_KEY"
import { gql, request } from 'graphql-request'
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';


@Component({
  selector: 'app-employee-app',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './employee-app.component.html',
  styleUrl: './employee-app.component.css'
})
export class EmployeeAppComponent {
  employees: any

  constructor(private router: Router) { }

  ngOnInit() {
    // sets default component to the list
    if (this.router.url === "/employee-app") {
      this.router.navigate(["employee-app/list"])
    }
    this.checkLogin()
  }


  checkLogin() {
    const time = new Date().toTimeString().split(" ")[0]
    const expiryTime = localStorage.getItem("sessionExpiryTime") 
    
    if (expiryTime === null) {
      localStorage.removeItem("user")
      localStorage.removeItem("session")
      return
    }

    if (time > expiryTime) {

      localStorage.removeItem("user")
      localStorage.removeItem("session")
      localStorage.removeItem("sessionExpiryTime")

      this.router.navigate(["login"])
    }
  }

  generateSessionTime(time: string) {
    const timeArray = time.split(":") // split time into array based off of the :
    const hours = parseInt(timeArray[0]) + 3 // add 3 hours (expiry time) to the string
    const updatedTime =  `${hours}:${timeArray[1]}:${timeArray[2]}` // reassemble the string
    // console.log(updatedTime)
    return updatedTime // return the string + 3 hours
  }

  

}
