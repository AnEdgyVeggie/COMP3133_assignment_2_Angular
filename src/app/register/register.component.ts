import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'
import {API_URL} from "../constants/API_KEY"
import { gql, request } from 'graphql-request'
import { userInfo } from 'os';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private router: Router) { }

  async onSubmit(form: NgForm) {

    let register: any
    const values = form.form.value

    try {
      let registration: any = await this.registerUser(
        values["register-username"],
        values["register-email"],
        values["register-password"]
      )

      // console.log(registration.createUser._id)
      this.router.navigate(["/login"])

    } catch {
      console.log("USER COULD NOT BE CREATED")
    }

  }

  async registerUser(username: String, email: String, password: String) {

    const document = gql`
      mutation createUser($userInput: UserInput){
        createUser(userInput: $userInput) {
          _id
          username
          email
          password
        }
      }
    `

    const variables = {
      userInput: {
        email: email,
        password: password,
        username: username
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

// adad