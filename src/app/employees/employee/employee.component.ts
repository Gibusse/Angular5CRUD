import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) { form.reset(); }
    this.employeeService.selectedEmployee = {
      EmployeID: null,
      FirstName: '',
      LastName: '',
      EmpCode: '',
      Position: '',
      Office: ''
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.EmployeID == null) {
      this.employeeService.postEmployee(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.employeeService.getEmployeeList();
          this.toastr.success('Enregistrement réussie', 'Employee Register');
        });
    } else {
      this.employeeService.putEmployee(form.value.EmployeID, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.toastr.info('Mise à jour effectuée', 'Employee Register');
        });
    }
  }
}
