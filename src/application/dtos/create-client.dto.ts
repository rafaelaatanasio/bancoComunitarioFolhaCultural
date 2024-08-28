import { IsString, IsNumber } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  nome: string;

  @IsNumber()
  id: number;

  @IsString()
  endereco: string;

  @IsString()
  telefone: string;

  @IsNumber()
  rendaSalarial: number;
}
