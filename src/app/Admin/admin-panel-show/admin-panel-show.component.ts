import { AdminService } from './../../Services/Admin/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel-show',
  templateUrl: './admin-panel-show.component.html',
  styleUrls: ['./admin-panel-show.component.css'],
})
export class AdminPanelShowComponent implements OnInit {
  constructor(private adminService: AdminService) {}
  public isLoading = false;
  public isModalOpen = false;
  public allProducts;
  public deleteResponse;

  ngOnInit() {
    this.isLoading = true;
    this.fetchAllproduct();
  }

  fetchAllproduct() {
    this.adminService.getAllProducts().subscribe((res: any) => {
      console.log('when we fetch all products', res);
      this.allProducts = res.products;
      this.isLoading = false;
    });
  }

  deleteProduct(productID) {
    this.isLoading = true;
    this.adminService.deleteProduct(productID).subscribe((res: any) => {
      this.isLoading = false;
      this.isModalOpen = true;
      this.deleteResponse = res.message;
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.fetchAllproduct();
  }
}
