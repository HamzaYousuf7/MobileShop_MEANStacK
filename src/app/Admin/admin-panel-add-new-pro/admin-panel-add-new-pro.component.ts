import { AdminService } from './../../Services/Admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { printMessage } from '../../components/Util//printMessageConsole.js';

@Component({
  selector: 'app-admin-panel-add-new-pro',
  templateUrl: './admin-panel-add-new-pro.component.html',
  styleUrls: ['./admin-panel-add-new-pro.component.css'],
})
export class AdminPanelAddNewProComponent implements OnInit {

  constructor(private adminService: AdminService) {}

  public addNewProdForm: FormGroup;
  public mainImgPreview = null;
  public additionalImagesPriviews = [];
  public inValidImagesPick = 'YOU HAVE TO PICKED 4 IMAGES NO MORE NO LESS';
  public isLoading = false;
  public isModalOpen = false;
  public response;

  ngOnInit() {
    // inil form
    this.addNewProdForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      brandName: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      rating: new FormControl(null, [Validators.required]),
      availableColor: new FormControl(null, [Validators.required]),
      mainImg: new FormControl(null, [Validators.required]),
      additionalImages: new FormControl(null, [Validators.required]),
    });
  }

  addNewProduct() {
    this.isLoading = true;
    printMessage('new product form me kia aya ', this.addNewProdForm.value);
    this.adminService
      .addNewProduct(this.addNewProdForm.value)
      .subscribe((res: any) => {
        console.log(res);
        this.isLoading = false;
        this.isModalOpen = true;
        this.response = res.message;
      });
    this.addNewProdForm.reset();
    this.mainImgPreview = null;
    this.additionalImagesPriviews = null;
  }

  pickMainImgHandler(event: Event) {
    const img = (event.target as HTMLInputElement).files[0];
    //updating form
    this.addNewProdForm.patchValue({
      mainImg: img,
    });
    this.addNewProdForm.get('mainImg').updateValueAndValidity();
    printMessage('single image me kia aya ', img);

    //image preview
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.mainImgPreview = fileReader.result as string;
    };
    fileReader.readAsDataURL(img);
  }

  pickAddtionallImgHandler(event: Event) {
    const images = (event.target as HTMLInputElement).files;
    printMessage('multile image me kia aya ', images);
    if (images.length != 4) {
      this.additionalImagesPriviews = null; //Roll back
      return;
    }

    //updating form
    this.addNewProdForm.patchValue({
      additionalImages: images,
    });
    this.addNewProdForm.get('additionalImages').updateValueAndValidity();

    //!IMPO have to set to an array becasue on line 52 setting it to nu;;
    this.additionalImagesPriviews = [];

    //image preview
    const fileReader0 = new FileReader();
    const fileReader1 = new FileReader();
    const fileReader2 = new FileReader();
    const fileReader3 = new FileReader();

    //!1
    fileReader0.onload = () => {
      this.additionalImagesPriviews[0] = fileReader0.result as string;
    };
    fileReader0.readAsDataURL(images[0]);

    //!2
    fileReader1.onload = () => {
      this.additionalImagesPriviews[1] = fileReader1.result as string;
    };
    fileReader1.readAsDataURL(images[1]);

    //!3
    fileReader2.onload = () => {
      this.additionalImagesPriviews[2] = fileReader2.result as string;
    };
    fileReader2.readAsDataURL(images[2]);

    //!4
    fileReader3.onload = () => {
      this.additionalImagesPriviews[3] = fileReader3.result as string;
    };
    fileReader3.readAsDataURL(images[3]);

    printMessage('final resut ', this.additionalImagesPriviews);
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
