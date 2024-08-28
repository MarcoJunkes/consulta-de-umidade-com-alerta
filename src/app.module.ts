import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DadosConsultaModule } from './dados-consulta/dados-consulta.module';

@Module({
  imports: [DadosConsultaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
