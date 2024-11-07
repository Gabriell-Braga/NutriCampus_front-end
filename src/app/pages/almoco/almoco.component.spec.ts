import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmocoComponent } from './almoco.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AlmocoComponent', () => {
  let component: AlmocoComponent;
  let fixture: ComponentFixture<AlmocoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlmocoComponent ],
      imports: [ RouterTestingModule, HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmocoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
