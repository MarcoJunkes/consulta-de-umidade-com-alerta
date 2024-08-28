import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DadosConsultaService } from './dados-consulta.service';
import { DadosConsultaController } from './dados-consulta.controller';

@Module({
  imports: [HttpModule],
  controllers: [DadosConsultaController],
  providers: [DadosConsultaService],
})
export class DadosConsultaModule {}
