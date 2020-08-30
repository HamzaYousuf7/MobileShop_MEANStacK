import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserInputValidation } from './../components/Util/userInputValidation';
import { UserService } from './../Services/User/user.service';
import { printMessage } from '../components/Util/printMessageConsole.js';

@Component({
  selector: 'app-user-log-or-sing',
  templateUrl: './user-log-or-sing.component.html',
  styleUrls: ['./user-log-or-sing.component.css'],
})
export class UserLogOrSingComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  loginForm: FormGroup;
  singupForm: FormGroup;
  public isLoading = false;
  public responseMessage = '';
  public isModalOpen = false;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        UserInputValidation.isEmail,
      ]),
      password: new FormControl(null, [
        Validators.required,
        UserInputValidation.isPassword,
      ]),
    });

    this.singupForm = new FormGroup({
      firstname: new FormControl(null, [
        Validators.required,
        UserInputValidation.isName,
      ]),
      lastname: new FormControl(null, [
        Validators.required,
        UserInputValidation.isName,
      ]),
      email: new FormControl(null, [
        Validators.required,
        UserInputValidation.isEmail,
      ]),
      password: new FormControl(null, [
        Validators.required,
        UserInputValidation.isPassword,
      ]),
      phone: new FormControl(null, [
        Validators.required,
        UserInputValidation.isPhoneNo,
      ]),
      gender: new FormControl(null, [Validators.required]),
      isAgree: new FormControl(null, [Validators.required]),
    });
  }

  login() {
    printMessage('login form me kia aya he', this.loginForm.value);
    const tempUser = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    // spinner
    this.isLoading = true;
    // calling the http service
    this.userService.login(tempUser);
    // All the UI work listening to the status open model and showing message and starting spinner
    this.userService.getAuthStatusListner().subscribe((isAuthenticated) => {
      console.log(isAuthenticated);
      if (isAuthenticated) {
        this.isLoading = false;
        this.responseMessage = this.userService.responseMessage;
        this.isModalOpen = true;
      } else if (this.userService.isError && !isAuthenticated) {
        this.isLoading = false;
        this.responseMessage = this.userService.responseMessage;
        this.isModalOpen = true;
      }
    });
    // reseting the form
    this.loginForm.reset();
  }

  singup() {
    printMessage('singUpForm form me kia aya he', this.singupForm.value);
    const tempUser = {
      firstname: this.singupForm.value.firstname,
      lastname: this.singupForm.value.lastname,
      email: this.singupForm.value.email,
      password: this.singupForm.value.password,
      phone: this.singupForm.value.phone,
      gender: this.singupForm.value.gender,
    };

    // spinner
    this.isLoading = true;
    // calling the service
    this.userService.singup(tempUser);
    this.isLoading = true;

    // All the UI work listening to the status open model and showing message and starting spinner
    this.userService.getAuthStatusListner().subscribe((isAuthenticated) => {
      console.log(isAuthenticated);
      if (isAuthenticated) {
        this.isLoading = false;
        this.responseMessage = this.userService.responseMessage;
        this.isModalOpen = true;
      } else if (this.userService.isError && !isAuthenticated) {
        this.isLoading = false;
        this.responseMessage = this.userService.responseMessage;
        this.isModalOpen = true;
      }
    });
    // TODO now call service and send this obj
    this.singupForm.reset();
  }

  closeModal() {
    this.isModalOpen = false;
    //only run if we successfully login in
    if(!this.userService.isError) this.router.navigate(['/']);
  }
}
