import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Employee } from './employee.model';


@Injectable()
export class EmployeeService {

  selectedEmployee: Employee;
  employeeList: Employee[];
  url: 'http://localhost:62612/api/Employees';
  constructor(private http: HttpClient) { }

  postEmployee(emp: Employee) {
    const body = JSON.stringify(emp);
    const httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json'})
    };
    return this.http.post<Employee>('http://localhost:62612/api/Employees', body, httpOptions);
  }

  putEmployee(id,  emp) {
    const body = JSON.stringify(emp);
    const httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json'})
    };
    return this.http.put('http://localhost:62612/api/Employees' + id, body, httpOptions)
    .map(res => res.toString());
  }

  getEmployeeList() {
    return this.http.get('http://localhost:62612/api/Employees')
    .map((data: any[]) => data as Employee[]).toPromise().then(x => {
      this.employeeList = x;
    });
  }

  deleteEmployee(id: number) {
   return this.http.delete('http://localhost:62612/api/Employees/' + id).map(res => res);
  }
}
