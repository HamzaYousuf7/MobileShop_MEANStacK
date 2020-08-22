import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelShowComponent } from './admin-panel-show.component';

describe('AdminPanelShowComponent', () => {
  let component: AdminPanelShowComponent;
  let fixture: ComponentFixture<AdminPanelShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
