import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'
import {API_URL} from "../constants/API_KEY"
import { gql, request } from 'graphql-request'


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(private router: Router) { }

  async onSubmit(form: NgForm) {
    let login: any 
    let result: string
    const values = form.form.value

    if (values['login-username'].includes("@")) {
      login = await this.logInUser("email", values['login-username'], values['login-password'])
      result = login.loginUserEmail
    } else {
      login = await this.logInUser("username", values['login-username'], values['login-password'])
      result = login.loginUserUsername
    }

    console.log(result)

    if (result !== "false") {

      const date = new Date()
    
      const expiry = this.generateSessionTime(date.toTimeString().split(" ")[0])

      const sessionID = this.generateSessionID(22, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")


      localStorage.setItem("user", result)
      localStorage.setItem("session", sessionID)
      localStorage.setItem("sessionExpiryTime", expiry)

      this.router.navigate(["/employee-app"])
    }
  }
 

  async logInUser(type: String, user: String, password: String) {

    if (type === "email") { // EMAIL ============================================

      const document = gql`
        query loginUserEmail($userInput: UserLoginEmail) {
          loginUserEmail(userInput: $userInput)
        }
      `

    const variables = {
      userInput: {
        password: password,
        email: user
      }
    }

    const req = await request(
      API_URL, 
      document,
      variables
    )
      
      return req


    } else { // USERNAME =========================================================

      const document = gql`
        query loginUserUsername($userInput: UserLoginUsername) {
          loginUserUsername(userInput: $userInput)
        }
      `

    const variables = {
      userInput: {
        password: password,
        username: user
      }
    }

      const req = await request(
        API_URL, 
        document,
        variables
      )
      
      return req
      
    }
  }

  generateSessionID(length: number, chars: String) {
    var result = '';
    for (var i = length; i > 0; --i) 
      {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
       
      return result;
  }

  generateSessionTime(time: string) {
    const timeArray = time.split(":") // split time into array based off of the :
    const hours = parseInt(timeArray[0]) + 3 // add 3 hours (expiry time) to the string
    const updatedTime =  `${hours}:${timeArray[1]}:${timeArray[2]}` // reassemble the string
    // console.log(updatedTime)
    return updatedTime // return the string + 3 hours
  }


}
