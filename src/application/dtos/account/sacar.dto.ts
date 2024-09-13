import { IsNumber } from 'class-validator';

export class SacarDto {
  @IsNumber()
  clienteId: number;

  @IsNumber()
  contaNumero: number;

  @IsNumber()
  valor: number;
}
