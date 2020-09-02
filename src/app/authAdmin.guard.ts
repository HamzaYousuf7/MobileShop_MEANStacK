import { Injectable } from "@angular/core";
import { AdminService } from "./Services/Admin/admin.service";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";

import { Observable } from "rxjs";

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private adminService: AdminService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAdminAuth = this.adminService.isAdminAuth;
    if (!isAdminAuth) {
      this.router.navigate(["/admin/login"]);
    }
    return isAdminAuth;
  }
}
