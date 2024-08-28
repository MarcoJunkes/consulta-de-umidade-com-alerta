import { Controller, Post, Body } from '@nestjs/common';
import { DadosConsultaService } from './dados-consulta.service';
import { dadosDTO } from './dadosDTO/dados.dto';

@Controller('dados-consulta')
export class DadosConsultaController {
  constructor(private readonly dadosConsultaService: DadosConsultaService) {}

  @Post()
  async processaDados(@Body() dados: dadosDTO) {
    const { umidade, localizacao } = dados; // Extrai os campos umidade e localizacao do DTO

    // Verifica se ambos os campos obrigatórios foram fornecidos
    if (!umidade || !localizacao) {
      return "Dados obrigatórios não preenchidos!";
    }

    // Chama o método do serviço para processar os dados de clima e aguarda o resultado
    const result = await this.dadosConsultaService.processaDadosClima(umidade, localizacao);
    return result;
  }
}
