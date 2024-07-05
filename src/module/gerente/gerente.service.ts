import { Injectable } from '@nestjs/common';
import { Gerente } from '../../classes/gerente';
import { Cliente } from '../../classes/cliente';
import { Conta } from '../../classes/conta';

@Injectable()
export class GerentesService {
    private gerentes: Gerente[] = [];

    criarGerente(nome: string, id: number): Gerente {
        const gerente = new Gerente(nome, id);
        this.gerentes.push(gerente);
        return gerente;
    }

    buscarGerentePorId(id: number): Gerente {
        return this.gerentes.find(gerente => gerente.id === id);
    }

    adicionarCliente(gerenteId: number, cliente: Cliente): void {
        const gerente = this.buscarGerentePorId(gerenteId);
        gerente.adicionarCliente(cliente);
    }

    removerCliente(gerenteId: number, clienteId: number): void {
        const gerente = this.buscarGerentePorId(gerenteId);
        gerente.removerCliente(clienteId);
    }

    abrirConta(gerenteId: number, tipo: 'corrente' | 'poupanca', clienteId: number): Conta {
        const gerente = this.buscarGerentePorId(gerenteId);
        const cliente = gerente.clientes.find(cliente => cliente.id === clienteId);
        if (!cliente) throw new Error('Cliente não encontrado');
        return gerente.abrirConta(tipo, cliente);
    }

    fecharConta(gerenteId: number, clienteId: number, contaNumero: number): void {
        const gerente = this.buscarGerentePorId(gerenteId);
        const cliente = gerente.clientes.find(cliente => cliente.id === clienteId);
        if (!cliente) throw new Error('Cliente não encontrado');
        gerente.fecharConta(cliente, contaNumero);
    }

    modificarTipoConta(gerenteId: number, clienteId: number, contaNumero: number, novoTipo: 'corrente' | 'poupanca'): Conta {
        const gerente = this.buscarGerentePorId(gerenteId);
        const cliente = gerente.clientes.find(cliente => cliente.id === clienteId);
        if (!cliente) throw new Error('Cliente não encontrado');
        return gerente.modificarTipoConta(cliente, contaNumero, novoTipo);
    }
}
