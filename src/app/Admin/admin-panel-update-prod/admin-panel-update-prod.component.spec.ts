import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelUpdateProdComponent } from './admin-panel-update-prod.component';

describe('AdminPanelUpdateProdComponent', () => {
  let component: AdminPanelUpdateProdComponent;
  let fixture: ComponentFixture<AdminPanelUpdateProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelUpdateProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelUpdateProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
