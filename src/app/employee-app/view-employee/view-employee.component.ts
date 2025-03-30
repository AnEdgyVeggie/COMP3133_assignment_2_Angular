import { Component } from '@angular/core';
import {API_URL} from "../..//constants/API_KEY"
import { gql, request } from 'graphql-request'
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  imports: [RouterLink],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})

export class ViewEmployeeComponent {
  userId: any 
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
  createdDate: any
  updatedDate: any

  constructor(private route: ActivatedRoute) {
    let url: any = this.route.params.subscribe(param => {
      this.userId = param
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
    this.userId
  )

  this.employee = req.employee
  this.createdDate = new Date(parseInt(this.employee.created_at)).toDateString()

  if (this.employee.updated_at) {
    this.updatedDate = new Date(parseInt(this.employee.updated_at)).toDateString()
  } else {
    this.updatedDate = "N/A"
  }

  

  return req
  }

}
