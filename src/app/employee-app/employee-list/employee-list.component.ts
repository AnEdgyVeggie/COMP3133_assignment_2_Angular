import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {API_URL} from "../..//constants/API_KEY"
import { gql, request } from 'graphql-request'
import { Router, RouterLink } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees: any
  allEmployees: any

  constructor(private router: Router) { }

  ngOnInit() {
    this.fetchEmployees()
    this.checkLogin()
  }

  ngOnChanges() {
    this.checkLogin()
  }


  async fetchEmployees() {
    const document = gql`
      query {
        getEmployees {
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
    )

    this.employees = req.getEmployees
    this.allEmployees = req.getEmployees
    
    return req
  }

  async deleteEmployee(employeeId: string) {

    const document = gql`
      mutation deleteEmployee($id: ID!) {
        deleteEmployee(ID: $id)
      }
    `

    const variables = {
      id: 
        employeeId
      
    }


    const req = await request(
      API_URL,
      document,
      variables
    )

    this.fetchEmployees()

}

  viewEmployee(employeeId: string) {
    this.router.navigate(['/employee-app/view', employeeId])
  
  }

  updateEmployee(employeeId: string) {
    this.router.navigate(['/employee-app/update', employeeId])
  }

  async filterEmployees(form: NgForm) {

    let searchType = form.form.value['search-type'].toLowerCase()
    let searchString = form.form.value['search-string']

    if (searchType === "" || searchString === "") {
      this.fetchEmployees()
      return
    }

    let variables: any
    
    if (searchType === "department") {
      
      const document = gql`
      query getEmployeesDepartment($empDepartment: EmployeeDepartment) {
        getEmployeesDepartment(empDepartment: $empDepartment) {
          _id
          first_name
          last_name
          email
          gender6
          designation
          salary
          date_of_joining
          department
          employee_photo
          created_at
          updated_at
        }
      }
    `
      variables = {
        empDepartment: {
          department: searchString
        }
      } 

      const req: any = await request(
        API_URL,
        document,
        variables
      )

    this.employees = req.getEmployeesDepartment


    } else if (searchType === "designation") {

      const document = gql`
      query getEmployeesDesignation($empDesignation: EmployeeDesignation) {
        getEmployeesDesignation(empDesignation: $empDesignation) {
          _id
          first_name
          last_name
          email
          gender
          designation
          salary
          date_of_joining
          department
          employee_photo
          created_at
          updated_at
        }
      }
    `

      variables = {
        empDesignation: {
          designation: searchString
        }
      } 

      const req: any = await request(
        API_URL,
        document,
        variables
      )

      this.employees = req.getEmployeesDesignation

    }

  }

  checkLogin() {
    const time = new Date().toTimeString().split(" ")[0]
    const expiryTime = localStorage.getItem("sessionExpiryTime") || "00:00:00"

    if (expiryTime === null) {
      this.logout()
      return
    }

    if (time > expiryTime) {
      this.logout()
    }
  }

  logout() {

    localStorage.removeItem("user")
    localStorage.removeItem("session")
    localStorage.removeItem("sessionExpiryTime")

    this.router.navigate(["login"])
  }


}
