import { Conta } from "./conta";

export class Cliente {
    contas: Conta[] = [];

    constructor(
        public nome: string,
        public id: number,
        public endereco: string,
        public telefone: string,
        public rendaSalarial: number
    ) { }
}
