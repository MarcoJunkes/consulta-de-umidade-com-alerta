import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      return "Dados obrigatórios não preenchidos"
    }

    const umidadeNumber = parseInt(umidade);
    if (isNaN(umidadeNumber)) {
        return "Umidade fornecida não é um número válido.";
    }


    const [lat, lon] = localizacao.split(' ').map(Number);

    if (isNaN(lat) || isNaN(lon)) {
      return "Dados obrigatórios não preenchidos ou preenchidos de forma incorreta";
    }

    try{
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`; // Usa a chave da API armazenada
        const response = await firstValueFrom(this.httpService.get(apiUrl));
        const umidadeApi = response.data.main.humidity;
        const cidade = response.data.name;

        const comparaUmidade = umidadeNumber < umidadeApi; // Realiza a comparação
        const mensagem = comparaUmidade 
            ? 'Alerta: A umidade atual em ' + cidade + ' é de ' + umidadeApi + '%, que é maior que o valor informado de ' + umidade 
            : 'A umidade está dentro do limite informado!';

        return {
            mensagem: mensagem
        };
    }catch(error){
        throw new HttpException(
            `Falha ao obter dados de clima para a localização (${lat}, ${lon}). Verifique os parâmetros e tente novamente.`,
            HttpStatus.BAD_REQUEST,
        );        
    }
  }
}
