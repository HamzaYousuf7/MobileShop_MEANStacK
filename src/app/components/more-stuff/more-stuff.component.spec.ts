import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreStuffComponent } from './more-stuff.component';

describe('MoreStuffComponent', () => {
  let component: MoreStuffComponent;
  let fixture: ComponentFixture<MoreStuffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreStuffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
