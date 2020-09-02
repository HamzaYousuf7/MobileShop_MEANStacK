import { AdminService } from './../../Services/Admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private adminService: AdminService, private router: Router) {}
  public isLoading = false;
  public isModalOpen = false;
  public isAuth;
  public responseMessage;

  ngOnInit() {
    this.isAuth = this.adminService.isAdminAuth;
    this.adminService.getUpdateIsAuth().subscribe((isAuth) => {
      this.isLoading = false;
      this.isModalOpen = true;
      if (isAuth) {
        this.responseMessage = this.adminService.responseMessage;
      } else {
        this.responseMessage = this.adminService.errorMessage;
      }
    });
  }

  login(loginData) {
    this.isLoading = true;
    // calling http service
    this.adminService.loginAdmin({
      email: loginData.value.email,
      password: loginData.value.password,
    });

    // resetting the form
    loginData.reset();
  }

  closeModal() {
    this.isModalOpen = false;
    if (!this.adminService.isError) {
      this.router.navigate(['/']);
    }
  }
}
