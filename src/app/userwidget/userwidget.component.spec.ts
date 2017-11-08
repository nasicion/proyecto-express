import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserwidgetComponent } from './userwidget.component';

describe('UserwidgetComponent', () => {
  let component: UserwidgetComponent;
  let fixture: ComponentFixture<UserwidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserwidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
