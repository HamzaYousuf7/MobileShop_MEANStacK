import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelAddNewProComponent } from './admin-panel-add-new-pro.component';

describe('AdminPanelAddNewProComponent', () => {
  let component: AdminPanelAddNewProComponent;
  let fixture: ComponentFixture<AdminPanelAddNewProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelAddNewProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelAddNewProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
