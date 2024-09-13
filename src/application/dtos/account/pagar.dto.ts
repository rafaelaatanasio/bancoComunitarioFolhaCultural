import { IsNumber } from 'class-validator';

export class PagarDto {
  @IsNumber()
  clienteId: number;

  @IsNumber()
  contaNumero: number;

  @IsNumber()
  valor: number;
}
