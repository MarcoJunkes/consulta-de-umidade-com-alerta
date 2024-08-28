# Projeto de Consulta de Dados Climáticos

Este projeto foi desenvolvido usando o framework **NestJS** com **Node.js**. Ele permite consultar dados climáticos de uma localização específica, comparando a umidade atual com o valor informado pelo usuário.

## Pré-requisitos

- **Node.js** instalado (versão 14.x ou superior)
- **npm** (gerenciador de pacotes do Node)
- **NestJS CLI** instalado globalmente (opcional, mas recomendado)

## Instalação

1. **Clone o repositório** para sua máquina local:
   ```bash
   git clone https://github.com/MarcoJunkes/consulta-de-umidade-com-alerta.git
   cd consulta-de-umidade-com-alerta

2. **Instale as dependências do projeto**
    ```bash
    npm install

3. **Criação do arquivo '.env'**
    ```bash
    cp .env.example .env

4. **Agora dentro do arquivo .env**
    ```bash
    OPENWEATHER_API_KEY=sua_chave_api_aqui 

5. **Para executar o projeto**
    ```bash
    npm run start:dev

# Lógica de funcionamento

O projeto é composto por três principais componentes:

1. **Controller (`DadosConsultaController`)**: Gerencia as requisições HTTP e faz a validação inicial dos dados recebidos pelo usuário. Quando uma requisição POST é recebida, o controlador verifica se todos os dados obrigatórios estão preenchidos e chama o serviço responsável pelo processamento.

2. **Service (`DadosConsultaService`)**: Contém a lógica de negócios para a consulta dos dados climáticos. Ele valida as entradas, realiza uma chamada à API do OpenWeather com as coordenadas fornecidas (latitude e longitude) e compara a umidade informada pelo usuário com a umidade atual da localização.

3. **Data Transfer Object (DTO) (`dadosDTO`)**: Define a estrutura de dados que é esperada na requisição. O `DTO` inclui dois campos:
   - **`umidade`**: Representa a umidade informada pelo usuário como uma string.
   - **`localizacao`**: Representa a localização em termos de latitude e longitude, separados por um espaço.

O serviço faz a verificação dos dados de entrada, realiza a chamada à API e lida com possíveis erros, retornando mensagens apropriadas baseadas na comparação dos dados de umidade.

Para consultar os dados climáticos, envie uma requisição `POST` para o endpoint `/dados-consulta` com o corpo no formato JSON:

```json
{
  "umidade": "50",
  "localizacao": "37.7749 -122.4194"
}


