import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from "./login/login.component"
import { RegisterComponent } from './register/register.component';
import { EmployeeAppComponent }  from './employee-app/employee-app.component'
import { ErrorPageComponent } from './error-page/error-page.component';
import { EmployeeListComponent } from './employee-app/employee-list/employee-list.component';
import { AddEmployeeComponent } from './employee-app/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './employee-app/view-employee/view-employee.component';
import { UpdateEmployeeComponent } from './employee-app/update-employee/update-employee.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "employee-app", component: EmployeeAppComponent, children: [
        { path: "list", component: EmployeeListComponent },
        { path: "add", component: AddEmployeeComponent },
        { path: `view/:id`, component: ViewEmployeeComponent },
        { path: `update/:id`, component: UpdateEmployeeComponent },
    ] }, 
    { path: "**", component: ErrorPageComponent }
];
