import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.css'],
})
export class BackdropComponent implements OnInit {
  constructor() {}
  @Input() isBackdropOpen;
  @Output() toggleBackdropOutput = new EventEmitter();
  ngOnInit() {}

  toggleBackdropHandler(){
    this.toggleBackdropOutput.emit();
  }
}
