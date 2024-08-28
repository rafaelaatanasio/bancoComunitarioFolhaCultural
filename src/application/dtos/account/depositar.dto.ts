import { IsNumber } from 'class-validator';

export class DepositarDto {
  @IsNumber()
  clienteId: number;

  @IsNumber()
  contaNumero: number;

  @IsNumber()
  valor: number;
}
