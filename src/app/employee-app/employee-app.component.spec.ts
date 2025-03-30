import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAppComponent } from './employee-app.component';

describe('EmployeeAppComponent', () => {
  let component: EmployeeAppComponent;
  let fixture: ComponentFixture<EmployeeAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
