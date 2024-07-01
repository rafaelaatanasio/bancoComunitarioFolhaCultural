import { Injectable } from '@nestjs/common';
import { ContaBancaria } from '../conta/conta.service';
import { Gerente } from '../gerente/gerente.service';

// criar/definir a classe cliente
@Injectable()
export class ClienteService {
    private clientes: Cliente[] = []; // Objeto para armazenar os clientes

    adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }
}

obterClientePorId(id: string): Cliente {
    return this.clientes.find(cliente => cliente.id === id);
  }

// Método para abrir uma conta para o cliente
abrirConta(cliente: Cliente, conta: ContaBancaria): void {
    cliente.contas.push(conta); // método push do array contas para adicionar a nova conta
    // à lista de contas do cliente.
}

// Método para fechar uma conta do cliente
fecharConta(cliente: Cliente, conta: ContaBancaria): void {
    cliente.contas = cliente.contas.filter(c => c !== conta);
    // O método filter é uma função embutida de arrays em JavaScript (e TypeScript) que cria 
    // um novo array com todos os elementos que passam no teste implementado pela função fornecida.
    // c => c !== conta é uma função de callback (função anônima) que é chamada para cada
    // elemento c no array contas.
}

// Método para modificar o tipo de conta do cliente
mudarTipoConta(cliente: Cliente, conta: ContaBancaria, novoTipo: string): void {
    conta.tipo = novoTipo;
}
// Implemente a lógica de negócios dentro dos serviços e controladores criados
// anteriormente. Por exemplo, no serviço de cliente, você pode definir métodos
// para abrir, fechar e modificar contas bancárias.

export class Cliente {
    constructor(
        public nomeCompleto: string,
        public id: string,
        public endereco: string,
        public telefone: string,
        public contas: ContaBancaria[] = [],
        public gerente: Gerente,
    ) { }
}