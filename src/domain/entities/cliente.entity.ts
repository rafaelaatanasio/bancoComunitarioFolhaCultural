import { Conta } from "./conta.entity";

export class Cliente {
  public contas: Conta[] = [];

  constructor(
      public nome: string,
      public id: number,
      public endereco: string,
      public telefone: string,
      public rendaSalarial: number
  ) {}
}