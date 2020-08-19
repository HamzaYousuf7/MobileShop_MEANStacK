import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UserInputValidation {
  static isName(control: AbstractControl): ValidationErrors | null {
    let regexp = new RegExp("^[a-z,A-Z]{1,8}$");
    let test = regexp.test(control.value);

    if (!test) {
      return {
        isName: true,
      };
    }
    return null;
  }

  static isEmail(control: AbstractControl): ValidationErrors | null {
    let regexp = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    );
    let test = regexp.test(control.value);

    if (!test) {
      return {
        isEmail: true,
      };
    }
    return null;
  }

  static isPhoneNo(control: AbstractControl): ValidationErrors | null {
    let regexp = new RegExp("^[0-9]{1,11}$");
    let test = regexp.test(control.value);
    if (!test) {
      return {
        isPhoneNo: true,
      };
    }
    return null;
  }

  static isPassword(control: AbstractControl): ValidationErrors | null {
    let regexp = new RegExp("^[a-z,A-Z,0-9]{3,8}$");
    let test = regexp.test(control.value);
    if (!test) {
      return {
        isPassword: true,
      };
    }
    return null;
  }
}
