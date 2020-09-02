import { AdminService } from './../../Services/Admin/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private AdminService : AdminService) {}
  public isAdminAuth;
  public responseMessage;

  ngOnInit() {
    this.isAdminAuth = this.AdminService.isAdminAuth;
    this.AdminService.getUpdateIsAuth().subscribe((isAuth) => {
      this.isAdminAuth = isAuth;
    });
  }

  logout() {
    this.AdminService.logout();
  }
}
