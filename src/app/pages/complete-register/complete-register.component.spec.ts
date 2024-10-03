import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteRegisterComponent } from './complete-register.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CompleteRegisterComponent', () => {
  let component: CompleteRegisterComponent;
  let fixture: ComponentFixture<CompleteRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteRegisterComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
