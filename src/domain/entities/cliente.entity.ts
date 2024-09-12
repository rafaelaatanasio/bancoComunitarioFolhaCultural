import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Conta } from "./conta.entity";

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  public id: string; // UUID como string

  @Column()
  public nome: string;

  @Column({ unique: true })
  public endereco: string;

  @Column({ unique: true })
  public telefone: string; // Deve ser string

  @Column()
  public rendaSalarial: number;

  @OneToMany(() => Conta, conta => conta.cliente)
  public contas: Conta[];
    gerente: any;

  constructor(
    nome: string,
    id: string,
    endereco: string,
    telefone: string,
    rendaSalarial: number
  ) {
    this.nome = nome;
    this.id = id;
    this.endereco = endereco;
    this.telefone = telefone;
    this.rendaSalarial = rendaSalarial;
  }
}
