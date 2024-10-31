import { TestBed } from '@angular/core/testing';

import { CardapioService } from './cardapio.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('CardapioService', () => {
  let service: CardapioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterTestingModule ]
    });
    service = TestBed.inject(CardapioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
