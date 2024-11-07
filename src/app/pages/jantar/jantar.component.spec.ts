import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JantarComponent } from './jantar.component';

describe('JantarComponent', () => {
  let component: JantarComponent;
  let fixture: ComponentFixture<JantarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JantarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JantarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
