import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Conta } from "./conta.entity";

@Entity('clientes') // posso modificar o nome
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  public id: number;
  
  @Column({ unique: true }) // mapeando as colunas
  public contas: Conta[] = []; // cada atributo vai virar uma coluna na tabela cliente

  @Column()
  public nome: string;

  @Column({ unique: true }) // configuração de único
  public endereco: string;

  @Column({ unique: true }) // configuração de único
  public telefone: string;

  @Column()
  public rendaSalarial: number

  constructor(
    nome: string,
    id: number,
    endereco: string,
    telefone: string,
    rendaSalarial: number
  ) {
    this.nome = nome;
    this.id = id;
    this.endereco = endereco;
    this.telefone = telefone;
    this.rendaSalarial = rendaSalarial
  }
}