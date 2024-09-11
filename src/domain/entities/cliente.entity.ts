import { Conta } from "./conta.entity";

export class Cliente {
  public contas: Conta[] = [];
  public nome: string;
  public id: number;
  public endereco: string;
  public telefone: string;
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