import { IsNumber, IsString } from 'class-validator';

export class CreateContaDto {
  @IsNumber()
  clienteId: number;

  @IsString()
  tipo: 'corrente' | 'poupanca';
}
