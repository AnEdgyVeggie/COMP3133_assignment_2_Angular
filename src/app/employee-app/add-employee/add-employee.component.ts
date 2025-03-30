import { Component } from '@angular/core';
import {API_URL} from "../..//constants/API_KEY"
import { gql, request } from 'graphql-request'
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'



@Component({
  selector: 'app-add-employee',
  imports: [RouterLink, FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  constructor(private router: Router) { }

  async onSubmit(form: NgForm) {
    const values: object = form.form.value
  
    // console.log(values)
  
    try  {
      const employee: any =  await this.createEmployee(values)
      this.router.navigate(["/employee-app/list"])
    }
    catch {
      console.log("employee creation failed")
    }

  }

  async createEmployee(employee: any) {

  const document = gql`
        mutation createEmployee($employeeInput: EmployeeInput) {
          createEmployee(employeeInput: $employeeInput) {
            _id
          }
        }
      `

    const variables = {
      employeeInput: {
        department: employee.department,
        designation: employee.designation,
        email: employee.email,
        employee_photo: employee['photo-upload'],
        first_name: employee['first-name'],
        gender: employee.gender,
        last_name: employee['last-name'],
        salary: parseInt(employee.salary)
      }
    }

    console.log(variables)


    const req = await request(
      API_URL,
      document,
      variables
    )
    
    return req

  }

}
