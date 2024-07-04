import { Conta } from "./conta";

export class Cliente {
    constructor(
        public nome: string,
        public id: number,
        public endereco: string,
        public telefone: string,
        public rendaSalarial: number,
        public contas: Conta[] = []
    ) { }
}
