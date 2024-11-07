import { TestBed } from '@angular/core/testing';

import { RefeicoesService } from './refeicoes.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('RefeicoesService', () => {
  let service: RefeicoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterTestingModule ]
    });
    service = TestBed.inject(RefeicoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
