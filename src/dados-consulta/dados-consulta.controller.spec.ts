import { Test, TestingModule } from '@nestjs/testing';
import { DadosConsultaController } from './dados-consulta.controller';
import { DadosConsultaService } from './dados-consulta.service';

describe('DadosConsultaController', () => {
  let controller: DadosConsultaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DadosConsultaController],
      providers: [DadosConsultaService],
    }).compile();

    controller = module.get<DadosConsultaController>(DadosConsultaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
