import { IsString, IsNumber, IsEnum, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { TipoConta } from 'src/domain/enums/tipoConta.enum';
import { Conta } from 'src/domain/entities/conta.entity';

export class GerenteDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  @IsOptional()
  clienteId?: number;

  @IsString()
  @IsOptional()
  clienteNome?: string;

  @IsString()
  @IsOptional()
  endereco?: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsNumber()
  @IsOptional()
  rendaSalarial?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Conta)
  @IsOptional()
  contas?: Conta[] = [];

  @IsEnum(TipoConta)
  @IsOptional()
  tipo?: TipoConta;

  @IsNumber()
  @IsOptional()
  contaNumero?: number;

  @IsEnum(TipoConta)
  @IsOptional()
  novoTipo?: TipoConta;
}
