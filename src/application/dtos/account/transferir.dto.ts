import { IsNumber } from 'class-validator';

export class TransferirDto {
  @IsNumber()
  clienteId: number;

  @IsNumber()
  contaNumero: number;

  @IsNumber()
  valor: number;

  @IsNumber()
  contaDestinoId: number;

  @IsNumber()
  contaDestinoNumero: number;
}
