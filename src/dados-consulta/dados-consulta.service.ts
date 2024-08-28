import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DadosConsultaService {
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService // Injeta o ConfigService
  ) {
    this.apiKey = this.configService.get<string>('OPENWEATHER_API_KEY'); // Obtém a chave da API do .env
  }

  async processaDadosClima(umidade: string, localizacao: string): Promise<any> {
    if (!umidade || !localizacao) {
      throw new Error('Localização não fornecida.');
    }

    const [lat, lon] = localizacao.split(' ').map(Number);

    if (isNaN(lat) || isNaN(lon)) {
      throw new Error('Formato de localização inválido. É esperado que seja "latitude longitude".');
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`; // Usa a chave da API armazenada
    const response = await firstValueFrom(this.httpService.get(apiUrl));
    const umidadeApi = response.data.main.humidity;
    const cidade = response.data.name;

    const comparaUmidade = parseInt(umidade) < umidadeApi;
    const mensagem = comparaUmidade 
      ? 'Alerta: A umidade atual em ' + cidade + ' é de ' + umidadeApi + '%, que é maior que o valor informado de ' + umidade 
      : 'A umidade está dentro do limite informado!';

    return {
      mensagem: mensagem
    };
  }
}
