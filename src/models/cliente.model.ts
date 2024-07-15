export class Cliente {
  constructor(
      public id: number,
      public nome: string,
      public endereco: string,
      public telefone: string,
      public rendaSalarial: number,
      public contas: Conta[] = []
  ) { }
}
