import { Test, TestingModule } from '@nestjs/testing';
import { DadosConsultaService } from './dados-consulta.service';

describe('DadosConsultaService', () => {
  let service: DadosConsultaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DadosConsultaService],
    }).compile();

    service = module.get<DadosConsultaService>(DadosConsultaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
