import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserInputValidation } from '../components/Util/userInputValidation';
import { printMessage } from '../components/Util/printMessageConsole.js';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  constructor() {}
  //var dec
  public contactForm: FormGroup;
  ngOnInit() {
    //iniz contact form
    this.contactForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        UserInputValidation.isName,
      ]),
      email: new FormControl(null, [
        Validators.required,
        UserInputValidation.isEmail,
      ]),
      phone: new FormControl(null, [
        Validators.required,
        UserInputValidation.isPhoneNo,
      ]),
      message: new FormControl(null, [Validators.required]),
    });
  }

  sendMessage() {
    printMessage('contact us form me kia aya', this.contactForm.value);
    //TODO CALL HTTP AND SEND REQ

    //!reseting the form
    this.contactForm.reset();
  }
}
