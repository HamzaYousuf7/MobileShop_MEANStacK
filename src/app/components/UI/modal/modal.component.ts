import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  constructor() {}
  @Input() isModalOpen;
  @Output() toggleModalOutput = new EventEmitter();

  ngOnInit() {}

  toggleModalHandler() {
    this.toggleModalOutput.emit();
  }
}
