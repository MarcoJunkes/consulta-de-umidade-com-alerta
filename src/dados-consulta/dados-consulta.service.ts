import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DadosConsultaService {
  constructor(private readonly httpService: HttpService) {}

  async processaDadosClima(umidade: string, localizacao: string): Promise<any> {
    if (!umidade || !localizacao) {
      throw new Error('Dados obrigatórios não preenchidos!.');
    }

    const [lat, lon] = localizacao.split(' ').map(Number);

    if (isNaN(lat) || isNaN(lon)) {
      throw new Error('Formato de localização inválido. É esperado que seja "latitude longitude".');
    }

    return {
      latitude: lat,
      longitude: lon,
      umidade: umidade
    };
  }
}
