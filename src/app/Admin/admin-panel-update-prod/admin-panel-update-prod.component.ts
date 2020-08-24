import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AdminService } from './../../Services/Admin/admin.service';
import { printMessage } from '../../components/Util//printMessageConsole.js';

@Component({
  selector: 'app-admin-panel-update-prod',
  templateUrl: './admin-panel-update-prod.component.html',
  styleUrls: ['./admin-panel-update-prod.component.css'],
})
export class AdminPanelUpdateProdComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {}

  public updateProduct;
  public productID;
  public updateProdForm: FormGroup;

  // img preview
  public ServerMainImgPreview = null;
  public serverAdditionalImagesPriviews = [];
  public localMainImgPreview = null;
  public localAdditionalImagesPriviews = [];

  public inValidImagesPick = 'YOU HAVE TO PICKED 4 IMAGES NO MORE NO LESS';
  public isLoading = false;
  public isModalOpen = false;
  public response;

  ngOnInit() {
    // INI the form
    this.updateProdForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      brandName: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      rating: new FormControl(null, [Validators.required]),
      availableColor: new FormControl(null, [Validators.required]),
      mainImg: new FormControl(null, [Validators.required]),
      additionalImages: new FormControl(null, [Validators.required]),
    });

    // gettin route params and call get to fetch product and setting from value
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productID')) {
        this.productID = paramMap.get('productID');

        this.isLoading = true; // showing spinner
        this.adminService
          .getSingleProduct(this.productID)
          .subscribe((res: any) => {
            printMessage('res from the server', res);
            this.updateProduct = res.product;
            this.isLoading = false; // hidding spinner
            // Updating the form value
            this.updateProdForm.setValue({
              name: this.updateProduct.name,
              brandName: this.updateProduct.brandName,
              price: this.updateProduct.price,
              description: this.updateProduct.description,
              rating: this.updateProduct.rating,
              availableColor: this.updateProduct.availableColor,
              mainImg: this.updateProduct.mainImg,
              additionalImages: this.updateProduct.additionalImages,
            });

            // seting the previews of imahes
            this.ServerMainImgPreview = this.updateProduct.mainImg;
            this.serverAdditionalImagesPriviews = this.updateProduct.additionalImages;

            printMessage(
              'after population form value form state',
              this.updateProdForm.value
            );
          });
      }
    });
  }

  updateProductHandler() {
    this.isLoading = true;
    printMessage('final result of product form', this.updateProdForm.value);
    this.adminService.updateProduct(this.updateProdForm.value, this.productID).subscribe((res: any) => {
      this.isLoading = false;
      this.isModalOpen = true;
      this.response = res.message;
    });
    // reseting everything
    this.updateProdForm.reset();
    this.ServerMainImgPreview = null;
    this.serverAdditionalImagesPriviews  = null;
    this.localMainImgPreview = null;
    this.localAdditionalImagesPriviews = null;
  }

  pickMainImgHandler(event: Event) {
    this.ServerMainImgPreview = null;
    const img = (event.target as HTMLInputElement).files[0];
    // updating form
    this.updateProdForm.patchValue({
      mainImg: img,
    });
    this.updateProdForm.get('mainImg').updateValueAndValidity();
    printMessage('single image me kia aya ', img);

    // image preview
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.localMainImgPreview = fileReader.result as string;
    };
    fileReader.readAsDataURL(img);
  }

  pickAddtionallImgHandler(event: Event) {
    this.serverAdditionalImagesPriviews = null; // roll back ab local img dekho
    this.updateProdForm.get('additionalImages').reset(); // roll back validity me false kar rhe he

    const images = (event.target as HTMLInputElement).files;
    printMessage('multile image me kia aya ', images);

    if (images.length != 4) {
      this.localAdditionalImagesPriviews = null; // Roll back
      return;
    }

    // updating form
    this.updateProdForm.patchValue({
      additionalImages: images,
    });
    this.updateProdForm.get('additionalImages').updateValueAndValidity();

    // !IMPO have to set to an array becasue on line 52 setting it to nu;;
    this.localAdditionalImagesPriviews = [];

    //image preview
    const fileReader0 = new FileReader();
    const fileReader1 = new FileReader();
    const fileReader2 = new FileReader();
    const fileReader3 = new FileReader();

    //!1
    fileReader0.onload = () => {
      this.localAdditionalImagesPriviews[0] = fileReader0.result as string;
    };
    fileReader0.readAsDataURL(images[0]);

    //!2
    fileReader1.onload = () => {
      this.localAdditionalImagesPriviews[1] = fileReader1.result as string;
    };
    fileReader1.readAsDataURL(images[1]);

    //!3
    fileReader2.onload = () => {
      this.localAdditionalImagesPriviews[2] = fileReader2.result as string;
    };
    fileReader2.readAsDataURL(images[2]);

    //!4
    fileReader3.onload = () => {
      this.localAdditionalImagesPriviews[3] = fileReader3.result as string;
    };
    fileReader3.readAsDataURL(images[3]);

    printMessage(
      'final resut of local img after file reader',
      this.localAdditionalImagesPriviews
    );
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
