import { Component } from '@angular/core';
import {API_URL} from "../..//constants/API_KEY"
import { gql, request } from 'graphql-request'
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'



@Component({
  selector: 'app-update-employee',
  imports: [RouterLink, FormsModule],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent {

  id: any 
  employee: any = {        
    _id: "loading",
    created_at: "loading",
    date_of_joining: "loading",
    department: "loading",
    designation: "loading",
    email: "loading",
    employee_photo: "loading",
    first_name: "loading",
    gender: "loading",
    last_name: "loading",
    salary: "loading",
    updated_at: "loading"
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    let url: any = this.route.params.subscribe(param => {
      this.id = param
    })
   }


   ngOnInit(){
    this.fetchEmployee()
  }

  async fetchEmployee() {
    const document = gql`
    query employee($id: ID!) {
      employee(ID: $id) {
        _id
        created_at
        date_of_joining
        department
        designation
        email
        employee_photo
        first_name
        gender
        last_name
        salary
        updated_at
      }
    }
  `

  const req: any = await request(
    API_URL, 
    document,
    this.id
  )

  this.employee = req.employee
  

  return req
  }



  async onSubmit(form: NgForm) {
    const values: object = form.form.value
  
    try  {
      const employee: any =  await this.updateEmployee(values)
      this.router.navigate(["/employee-app/list"])
    }
    catch {
      console.log("employee updating failed")
    }

  }





  async updateEmployee(employee: any) {

  let employeeInput = {}    

    



  const document = gql`
      mutation editEmployee($id: ID!, $employeeInput: EmployeeInput) {
        editEmployee(ID: $id, employeeInput: $employeeInput) 
      }
    `

    const variables = {
      id: this.id.id,
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
