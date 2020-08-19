import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogOrSingComponent } from './user-log-or-sing.component';

describe('UserLogOrSingComponent', () => {
  let component: UserLogOrSingComponent;
  let fixture: ComponentFixture<UserLogOrSingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLogOrSingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLogOrSingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
