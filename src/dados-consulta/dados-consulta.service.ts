import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DadosConsultaService {
    private readonly apiKey: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService // Injeta o ConfigService para acesso a variáveis de ambiente
    ) {
        this.apiKey = this.configService.get<string>('OPENWEATHER_API_KEY'); // Obtém a chave da API do arquivo .env
    }

    /**
     * Processa os dados climáticos para uma localização específica comparando a umidade fornecida com a umidade obtida da API.
     * @param umidade - Umidade fornecida pelo usuário para comparação.
     * @param localizacao - Localização em formato "latitude longitude".
     * @returns Mensagem com o resultado da comparação.
     */
    async processaDadosClima(umidade: string, localizacao: string): Promise<any> {
        // Verifica se os dados obrigatórios foram fornecidos
        if (!umidade || !localizacao) {
            return "Dados obrigatórios não preenchidos";
        }

        // Converte a umidade para um número e verifica se é válido
        const umidadeNumber = parseInt(umidade);
        if (isNaN(umidadeNumber)) {
            return "Umidade fornecida não é um número válido.";
        }

        // Divide a localização em latitude e longitude e converte para números
        const [lat, lon] = localizacao.split(' ').map(Number);
        if (isNaN(lat) || isNaN(lon)) {
            return "Dados obrigatórios não preenchidos ou preenchidos de forma incorreta";
        }

        try {
            // Monta a URL da API do OpenWeather com a chave da API e coordenadas
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
            // Realiza a chamada HTTP e aguarda a resposta
            const response = await firstValueFrom(this.httpService.get(apiUrl)); // Realiza a chamada HTTP à API
            const umidadeApi = response.data.main.humidity; // Obtém a umidade atual da resposta da API
            const cidade = response.data.name; // Obtém o nome da cidade da resposta da API

            // Compara a umidade fornecida com a umidade obtida da API
            const comparaUmidade = umidadeNumber < umidadeApi; // Realiza a comparação
            // Constrói a mensagem com base na comparação
            const mensagem = comparaUmidade 
                ? 'Alerta: A umidade atual em ' + cidade + ' é de ' + umidadeApi + '%, que é maior que o valor informado de ' + umidade 
                : 'A umidade está dentro do limite informado!'; // Se "comparaUmidade" for verdadeiro, retorna a primeira condição, se não, retorna a segunda

            return {
                mensagem: mensagem
            };
        } catch (error) {
            // Lança uma exceção HTTP em caso de erro na chamada à API ou processamento
            throw new HttpException(
                `Falha ao obter dados de clima para a localização (${lat}, ${lon}). Verifique os parâmetros e tente novamente.`,
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
