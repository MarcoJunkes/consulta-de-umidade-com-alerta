import { Controller, Post, Body } from '@nestjs/common';
import { DadosConsultaService } from './dados-consulta.service';
import { dadosDTO } from './dadosDTO/dados.dto';

@Controller('dados-consulta')
export class DadosConsultaController {
  constructor(private readonly dadosConsultaService: DadosConsultaService) {}

  @Post()
  async processaDados(@Body() dados: dadosDTO) {
    const { umidade, localizacao } = dados;

    if (!umidade || !localizacao) {
      throw new Error('Umidade e localização são obrigatórios.');
    }

    const result = await this.dadosConsultaService.processaDadosClima(umidade, localizacao); 
    return result;
  }
}
