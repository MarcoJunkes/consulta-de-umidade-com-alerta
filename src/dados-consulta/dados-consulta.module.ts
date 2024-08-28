import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DadosConsultaService } from './dados-consulta.service';
import { DadosConsultaController } from './dados-consulta.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [DadosConsultaController],
  providers: [DadosConsultaService],
})
export class DadosConsultaModule {}
