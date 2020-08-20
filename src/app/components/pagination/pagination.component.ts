import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import _ from "lodash";
@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"],
})
export class PaginationComponent implements OnInit {
  constructor() {}
  @Input() pageSize;
  @Input() currentPage;
  @Input() maxProductsCount;
  @Output() pageChangeOutput = new EventEmitter();
  private pages;

  ngOnInit() {
    const pagesCount = Math.ceil(this.maxProductsCount / this.pageSize);
    this.pages = _.range(1, pagesCount + 1);
  }

  pageChangeHandler(page) {
    this.pageChangeOutput.emit(page);
  }
}
