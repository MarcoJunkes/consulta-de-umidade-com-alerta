import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DadosConsultaModule } from './dados-consulta/dados-consulta.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    DadosConsultaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
