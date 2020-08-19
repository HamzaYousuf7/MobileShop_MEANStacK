import { UserInputValidation } from "./../components/Util/userInputValidation";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { printMessage } from "../components/Util/printMessageConsole.js";

@Component({
  selector: "app-user-log-or-sing",
  templateUrl: "./user-log-or-sing.component.html",
  styleUrls: ["./user-log-or-sing.component.css"],
})
export class UserLogOrSingComponent implements OnInit {
  constructor() {}
  loginForm: FormGroup;
  singupForm: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        UserInputValidation.isEmail,
      ]),
      passowrd: new FormControl(null, [
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
    printMessage("login form me kia aya he", this.loginForm.value);
    const tempUser = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    //TODO now call service and send this obj

    this.loginForm.reset();
  }

  singup() {
    printMessage("singUpForm form me kia aya he", this.singupForm.value);
    const tempUser = {
      firstname: this.singupForm.value.firstname,
      lastname: this.singupForm.value.lastname,
      email: this.singupForm.value.email,
      password: this.singupForm.value.password,
      phone: this.singupForm.value.phone,
      gender: this.singupForm.value.gender,
    };
    //TODO now call service and send this obj
    this.singupForm.reset();
  }
}
